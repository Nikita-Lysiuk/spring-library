package pl.umcs.springlibrarybackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.*;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.dto.auth.LoginDto;
import pl.umcs.springlibrarybackend.dto.auth.RegisterDto;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.service.auth.LoginService;
import pl.umcs.springlibrarybackend.service.auth.PasswordService;
import pl.umcs.springlibrarybackend.service.auth.RegisterService;
import pl.umcs.springlibrarybackend.service.interfaces.AuthService;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final LoginService loginService;
    private final RegisterService registerService;
    private final PasswordService passwordService;



    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        return loginService.login(loginDto.getEmail(), loginDto.getPassword());
    }

    @Override
    public JwtAuthResponse register(RegisterDto registerDto) {
        return registerService.register(
                registerDto.getFirstName(),
                registerDto.getLastName(),
                registerDto.getEmail(),
                registerDto.getPassword()
        );
    }

    @Override
    public JwtAuthResponse twoFactorLogin(String pin, String userId) {
        return loginService.twoFactorLogin(pin, userId);
    }

    @Override
    public boolean validateAccessToken(String token) {
        String tokenWithoutBearer = token.substring(7);
        return jwtTokenProvider.validateToken(tokenWithoutBearer);
    }

    @Override
    public JwtAuthResponse refreshToken(String refreshToken) throws RefreshTokenNotValid {
        return refreshTokenService.refreshToken(refreshToken);
    }

    @Override
    public void logout(String token, String refreshToken) {
        loginService.logout(token, refreshToken);
    }

    @Override
    public void forgotPassword(String email) {
        passwordService.forgotPassword(email);
    }
}
