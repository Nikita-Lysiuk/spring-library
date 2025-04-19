package pl.umcs.springlibrarybackend.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.model.authDto.*;
import pl.umcs.springlibrarybackend.service.interfaces.AuthService;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }

    @PostMapping("/register")
    public ResponseEntity<JwtAuthResponse> register(@Valid @RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(authService.register(registerDto));
    }

    @PostMapping("/validate-token")
    public ResponseEntity<ValidateResponse> validate(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(new ValidateResponse(authService.validateAccessToken(token)));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<JwtAuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authService.refreshToken(refreshTokenRequest.getRefreshToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token,
                                         @Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        authService.logout(token, refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok("Logged out successfully");
    }
}
