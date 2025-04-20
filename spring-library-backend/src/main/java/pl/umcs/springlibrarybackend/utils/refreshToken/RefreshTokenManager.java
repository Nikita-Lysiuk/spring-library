package pl.umcs.springlibrarybackend.utils.refreshToken;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.repository.RefreshTokenRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RefreshTokenManager {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpirationDate(LocalDateTime.now().plusDays(7));
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(LocalDateTime.now());
        return refreshTokenRepository.save(refreshToken);
    }

    public void revokeToken(String token) {
        refreshTokenRepository.revokeToken(token);
    }

    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.findAllByUser(user)
                .forEach(token -> {
                    refreshTokenRepository.revokeToken(token.getToken());
                });
    }

    public void deleteExpiredTokens(String userId, LocalDateTime currentDate) {
        refreshTokenRepository.deleteExpiredTokens(userId, currentDate);
    }
}
