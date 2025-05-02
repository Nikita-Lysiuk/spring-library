package pl.umcs.springlibrarybackend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.CustomAuthException;
import pl.umcs.springlibrarybackend.exception.UserNotFoundException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.utils.AccountValidator;
import pl.umcs.springlibrarybackend.utils.TOTPUtils;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenManager;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenValidator;

import java.security.InvalidKeyException;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountValidator accountValidator;
    private final RefreshTokenManager refreshTokenManager;
    private final RefreshTokenValidator refreshTokenValidator;
    private final UserRepository userRepository;

    public JwtAuthResponse login(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            password
                    ));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String accessToken = jwtTokenProvider.generateToken(authentication);

            User user = ((CustomUserDetails) authentication.getPrincipal()).getUser();
            accountValidator.validateLocalAccount(user);

            if (user.isTwoFactorEnabled()) {
                return new JwtAuthResponse(null, null, true, user.getId());
            }

            RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user);

            return new JwtAuthResponse(accessToken, refreshToken.getToken());
        } catch (BadCredentialsException e) {
            throw new CustomAuthException("Invalid email or password");
        }
    }

    public JwtAuthResponse twoFactorLogin(String pin, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!user.isTwoFactorEnabled()) {
            throw new CustomAuthException("Two-factor authentication is not enabled for this user");
        }

        try {
            if (!TOTPUtils.verifyCode(user.getOtpSecret(), pin)) {
                throw new CustomAuthException("Invalid OTP code while verifying " );
            }
        } catch (InvalidKeyException e) {
            throw new CustomAuthException("Invalid OTP secret");
        }

        UserDetails userDetails = new CustomUserDetails(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        String accessToken = jwtTokenProvider.generateToken(authentication);
        String refreshToken = refreshTokenManager.createRefreshToken(user).getToken();

        return new JwtAuthResponse(accessToken, refreshToken);
    }

    public void logout(String token, String refreshToken) {
        String accessToken = token.substring(7);
        jwtTokenProvider.addAccessTokenToBlackList(accessToken);
        User user = refreshTokenValidator.validate(refreshToken).getUser();
        refreshTokenManager.revokeAllUserTokens(user);
        SecurityContextHolder.clearContext();
    }
}
