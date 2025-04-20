package pl.umcs.springlibrarybackend.security.interfaces;

import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;

public interface RefreshTokenService {
    JwtAuthResponse refreshToken(String refreshToken) throws RefreshTokenNotValid;
}
