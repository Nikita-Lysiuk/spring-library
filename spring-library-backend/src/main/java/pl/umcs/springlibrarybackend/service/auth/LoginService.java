package pl.umcs.springlibrarybackend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.CustomAuthException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.utils.AccountValidator;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenManager;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenValidator;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountValidator accountValidator;
    private final RefreshTokenManager refreshTokenManager;
    private final RefreshTokenValidator refreshTokenValidator;

    public JwtAuthResponse login(String email, String password) {
        // TODO if two-factor is enabled redirect to 2fa page
        // TODO add isTwoFactorEnabled to user in CustomUserDetails and jwt token
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

            RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user);

            return new JwtAuthResponse(accessToken, refreshToken.getToken());
        } catch (BadCredentialsException e) {
            throw new CustomAuthException("Invalid email or password");
        }
    }

    public void logout(String token, String refreshToken) {
        String accessToken = token.substring(7);
        jwtTokenProvider.addAccessTokenToBlackList(accessToken);
        User user = refreshTokenValidator.validate(refreshToken).getUser();
        refreshTokenManager.revokeAllUserTokens(user);
        SecurityContextHolder.clearContext();
    }
}
