package pl.umcs.springlibrarybackend.security;

import org.springframework.security.core.Authentication;
import pl.umcs.springlibrarybackend.model.CustomUserDetails;

public interface JwtService {
    String extractUsername(String token);

    String generateToken(Authentication authentication);

    boolean validateToken(String token);
}
