package pl.umcs.springlibrarybackend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.CustomUserDetails;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider implements JwtService {
    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app.jwt-expiration.milliseconds}")
    private long jwtExpiration;

    @Override
    public String generateToken(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Date expireDate = new Date(new Date().getTime() + jwtExpiration);

        return Jwts.builder()
                .subject(authentication.getName())
                .claim("id", userDetails.getId())
                .claim("name", userDetails.getFullName())
                .claim("email", userDetails.getEmail())
                .claim("avatarUrl", userDetails.getAvatarUrl().orElse(null))
                .claim("role", userDetails.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key())
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    @Override
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    @Override
    public boolean validateToken(String token) {
        //TODO: Add redis blacklist check
        try {
            Jwts.parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(token);
            return true;

        } catch (JwtException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
            return false;
        }
    }
}
