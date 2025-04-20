package pl.umcs.springlibrarybackend.utils.refreshToken;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.repository.RefreshTokenRepository;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class RefreshTokenValidator {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken validate(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RefreshTokenNotValid("Refresh token not found"));

        if (refreshToken.isRevoked() || refreshToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RefreshTokenNotValid("Refresh token is revoked or expired");
        }

        return refreshToken;
    }
}
