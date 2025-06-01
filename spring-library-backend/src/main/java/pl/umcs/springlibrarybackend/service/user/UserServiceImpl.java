package pl.umcs.springlibrarybackend.service.user;

import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.user.Enable2FAResponse;
import pl.umcs.springlibrarybackend.exception.EmailAlreadyCorrupted;
import pl.umcs.springlibrarybackend.exception.UserNotFoundException;
import pl.umcs.springlibrarybackend.exception.UsersException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.AuthProvider;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.service.diff.RedisService;
import pl.umcs.springlibrarybackend.service.diff.S3Service;
import pl.umcs.springlibrarybackend.service.interfaces.UserService;
import pl.umcs.springlibrarybackend.utils.utils.QRCodeUtils;
import pl.umcs.springlibrarybackend.utils.utils.RedisUtils;
import pl.umcs.springlibrarybackend.utils.utils.TOTPUtils;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final RedisService redisService;

    @Override
    public User getCurrentUser() {
        User user = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        return user;
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    @Override
    public void updateUser(String id, MultipartFile file, String fullName, String email) throws IOException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Error in finding user"));

        if (user.getProvider() != AuthProvider.LOCAL && !email.equals(user.getEmail())) {
            throw new UserNotFoundException("User cannot change email for OAuth account");
        }

        userRepository.findByEmail(email).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(user.getId())) {
                throw new EmailAlreadyCorrupted("Email is already in use");
            }
        });

        String avatarUrl = user.getAvatarUrl();

        if (file != null) {
            avatarUrl = s3Service.uploadFile(file);
        }

        user.setFullName(fullName);
        user.setEmail(email);
        user.setAvatarUrl(avatarUrl);
        userRepository.save(user);
    }

    @Override
    public Enable2FAResponse enable2FA() {
        User user = getCurrentUser();

        if (user.isTwoFactorEnabled()) {
            throw new UsersException("2FA is already enabled");
        }

        String otpSecret = TOTPUtils.generateSecret();
        redisService.set("otp:" + user.getId(), otpSecret, Duration.ofHours(1));

        try {
            String qrCodeUrl = TOTPUtils.getOtpAuthUrl(user.getEmail(), otpSecret);
            byte[] qrCodeImage = QRCodeUtils.generateQRCode(qrCodeUrl);
            String base64QRCode = QRCodeUtils.generateBase32QRCode(qrCodeImage);
            return new Enable2FAResponse(base64QRCode);
        } catch (WriterException | IOException e) {
            System.err.println("Error generating QR code: " + e.getMessage());
            throw new UsersException("Error generating QR code");
        }
    }

    @Override
    public void disable2FA(String code) {
        User user = getCurrentUser();

        if (!user.isTwoFactorEnabled()) {
            throw new UsersException("2FA is already disabled");
        }

        try {
            if (!TOTPUtils.verifyCode(user.getOtpSecret(), code)) {
                throw new UsersException("Invalid 2FA code");
            }

            user.setTwoFactorEnabled(false);
            user.setOtpSecret(null);
            userRepository.save(user);
        } catch (InvalidKeyException e) {
            System.err.println("Error validating 2FA code: " + e.getMessage());
            throw new UsersException("Error validating 2FA code");
        }
    }

    @Override
    public void validate2FA(String code) {
        User user = getCurrentUser();

        String base32Secret = RedisUtils.safeCast(redisService.get("otp:" + user.getId()), String.class);

        if (base32Secret == null) {
            throw new UsersException("base32Secret is lost");
        }

        try {
            if (!TOTPUtils.verifyCode(base32Secret, code)) {
                throw new UsersException("Invalid 2FA code");
            }
        } catch (InvalidKeyException e) {
            System.err.println("Error validating 2FA code: " + e.getMessage());
            throw new UsersException("Error validating 2FA code");
        }

        user.setTwoFactorEnabled(true);
        user.setOtpSecret(base32Secret);
        userRepository.save(user);
        redisService.delete("otp:" + user.getId());
    }
}
