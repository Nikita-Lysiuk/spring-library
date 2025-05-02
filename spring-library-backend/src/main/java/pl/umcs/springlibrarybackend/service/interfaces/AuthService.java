package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.dto.auth.LoginDto;
import pl.umcs.springlibrarybackend.dto.auth.RegisterDto;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    JwtAuthResponse register(RegisterDto registerDto);
    JwtAuthResponse twoFactorLogin(String pin, String userId);
    boolean validateAccessToken(String token);
    JwtAuthResponse refreshToken(String refreshToken);
    void logout(String Token, String refreshToken);
    void forgotPassword(String email);
}
