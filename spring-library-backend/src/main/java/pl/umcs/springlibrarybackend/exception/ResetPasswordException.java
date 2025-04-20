package pl.umcs.springlibrarybackend.exception;

public class ResetPasswordException extends RuntimeException {
    public ResetPasswordException(String message) {
        super(message);
    }
}
