package pl.umcs.springlibrarybackend.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.user.Enable2FAResponse;
import pl.umcs.springlibrarybackend.dto.user.FetchUser;
import pl.umcs.springlibrarybackend.dto.user.ResetPasswordRequest;
import pl.umcs.springlibrarybackend.dto.user.TwoFARequest;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.service.auth.PasswordService;
import pl.umcs.springlibrarybackend.service.interfaces.UserService;

import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordService passwordService;

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        passwordService.resetPassword(resetPasswordRequest.getToken(), resetPasswordRequest.getPassword());
        return ResponseEntity.ok(
                ApiResponse.success("Password reset successfully")
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<FetchUser>> getCurrentUser() {
        User user = userService.getCurrentUser();
        FetchUser fetchUser = new FetchUser(user.getId(), user.getFullName(), user.getEmail(), user.getAvatarUrl(), user.isTwoFactorEnabled());
        return ResponseEntity.ok(
                ApiResponse.success("User retrieved successfully", fetchUser)
        );
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateUser(
            @PathVariable String id,
            @RequestPart(value = "file", required = false)MultipartFile file,
            @RequestPart(value = "fullName", required = false) String fullName,
            @RequestPart(value = "email", required = false) String email
            ) throws IOException {
        userService.updateUser(id, file, fullName, email);

        return ResponseEntity.ok(
                ApiResponse.success("User updated successfully")
        );
    }

    @PostMapping("/enable-2fa")
    public ResponseEntity<ApiResponse<Enable2FAResponse>> enable2FA() {
        return ResponseEntity.ok(
                ApiResponse.success("Enable 2FA successfully", userService.enable2FA())
        );
    }

    @PostMapping("/validate-2fa")
    public ResponseEntity<ApiResponse<Void>> validate2FA(@RequestBody TwoFARequest twoFARequest) {
        userService.validate2FA(twoFARequest.code());
        return ResponseEntity.ok(
                ApiResponse.success("2FA validated successfully")
        );
    }

    @PostMapping("/disable-2fa")
    public ResponseEntity<ApiResponse<Void>> disable2FA(@RequestBody TwoFARequest twoFARequest) {
        userService.disable2FA(twoFARequest.code());
        return ResponseEntity.ok(
                ApiResponse.success("2FA disabled successfully")
        );
    }
}
