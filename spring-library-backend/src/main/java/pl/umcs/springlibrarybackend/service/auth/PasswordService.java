package pl.umcs.springlibrarybackend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.ForgotPasswordException;
import pl.umcs.springlibrarybackend.exception.ResetPasswordException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.AuthProvider;
import pl.umcs.springlibrarybackend.model.mail.MailRequest;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.service.RedisService;
import pl.umcs.springlibrarybackend.service.interfaces.MailService;
import pl.umcs.springlibrarybackend.utils.RedisUtils;

import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordService {
    private final UserRepository userRepository;
    private final MailService mailService;
    private final RedisService redisService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ForgotPasswordException("User with this email does not exist"));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new ForgotPasswordException("User is authenticated with OAuth2 provider. Please use OAuth2 login.");
        }

        String token = UUID.randomUUID().toString();
        String redisKey = "forgot-password:" + token;
        redisService.set(redisKey, user.getEmail(), Duration.ofMinutes(15));
        String resetLink = String.format("%s/reset-password?token=%s", frontendUrl, token);

        mailService.sendEmail(MailRequest.builder()
                .to(user.getEmail())
                .subject("Reset your password")
                .templateName("forgot-password")
                .variables(Map.of(
                        "username", user.getFullName(),
                        "resetLink", resetLink
                )).build());
    }

    public void resetPassword(String token, String password) {
        String email = Optional.ofNullable(redisService.get("forgot-password:" + token))
                .map(obj -> RedisUtils.safeCast(obj, String.class))
                .orElseThrow(() -> new ResetPasswordException("Invalid or expired token"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResetPasswordException("User not found"));

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        redisService.delete("forgot-password:" + token);
    }
}
