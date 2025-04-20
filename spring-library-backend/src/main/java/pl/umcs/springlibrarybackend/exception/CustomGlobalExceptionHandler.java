package pl.umcs.springlibrarybackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.umcs.springlibrarybackend.dto.ApiResponse;

@RestControllerAdvice
public class CustomGlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(RefreshTokenNotValid.class)
    public ResponseEntity<String> handleRefreshTokenNotExistsException(RefreshTokenNotValid ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(CustomAuthException.class)
    public ResponseEntity<String> handleCustomAuthException(CustomAuthException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(OAuthOnlyAccountException.class)
    public ResponseEntity<String> handleOAuthOnlyAccountException(OAuthOnlyAccountException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(ForgotPasswordException.class)
    public ResponseEntity<ApiResponse<Void>> handleForgotPasswordException(ForgotPasswordException ex) {
        return ResponseEntity.ok(ApiResponse.failure(ex.getMessage()));
    }

    @ExceptionHandler(ResetPasswordException.class)
    public ResponseEntity<ApiResponse<Void>> handleResetPasswordException(ResetPasswordException ex) {
        return ResponseEntity.ok(ApiResponse.failure(ex.getMessage()));
    }
}
