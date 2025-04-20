package pl.umcs.springlibrarybackend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenManager;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenValidator;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenValidator refreshTokenValidator;
    private final RefreshTokenManager refreshTokenManager;


    @Override
    public JwtAuthResponse refreshToken(String refreshToken) throws RefreshTokenNotValid {
        User user = refreshTokenValidator.validate(refreshToken).getUser();
        UserDetails userDetails = new CustomUserDetails(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        String accessToken = jwtTokenProvider.generateToken(authentication);
        String newRefreshToken = refreshTokenManager.createRefreshToken(user).getToken();
        refreshTokenManager.revokeToken(refreshToken);
        return new JwtAuthResponse(accessToken, newRefreshToken);
    }
}
