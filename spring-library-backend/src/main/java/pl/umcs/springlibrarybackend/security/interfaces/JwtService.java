package pl.umcs.springlibrarybackend.security.interfaces;

import org.springframework.security.core.Authentication;

public interface JwtService {
    String extractUsername(String token);
    String generateToken(Authentication authentication);
    boolean validateToken(String token);
    void addAccessTokenToBlackList(String token);
}
