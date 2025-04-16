package pl.umcs.springlibrarybackend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.repository.RefreshTokenRepository;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpirationDate(LocalDateTime.now().plusDays(7));
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(LocalDateTime.now());
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void validateRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RefreshTokenNotValid("Refresh token not found"));

        if (refreshToken.isRevoked() || refreshToken.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RefreshTokenNotValid("Refresh token is revoked or expired");
        }

    }

    @Override
    public void revokeToken(String token) {
        refreshTokenRepository.revokeToken(token);
    }

    @Override
    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.findAllByUser(user)
                .forEach(token -> {
                    refreshTokenRepository.revokeToken(token.getToken());
                });
    }

    @Override
    public User getUserFromToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RefreshTokenNotValid("Refresh token not found"));
        return refreshToken.getUser();
    }

    @Override
    public void deleteExpiredTokens(String userId, LocalDateTime currentDate) {
        refreshTokenRepository.deleteExpiredTokens(userId, currentDate);
    }
}
