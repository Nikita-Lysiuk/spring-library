package pl.umcs.springlibrarybackend.security.interfaces;

import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import java.time.LocalDateTime;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(User user);
    void validateRefreshToken(String token);
    void revokeToken(String token);
    void revokeAllUserTokens(User user);
    User getUserFromToken(String token);
    void deleteExpiredTokens(String userId, LocalDateTime currentDate);
}
