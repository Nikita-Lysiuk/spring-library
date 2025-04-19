package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.model.authDto.JwtAuthResponse;
import pl.umcs.springlibrarybackend.model.authDto.LoginDto;
import pl.umcs.springlibrarybackend.model.authDto.RegisterDto;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    JwtAuthResponse register(RegisterDto registerDto);
    boolean validateAccessToken(String token);
    JwtAuthResponse refreshToken(String refreshToken);
    void logout(String Token, String refreshToken);
    void forgotPassword(String email);
}
