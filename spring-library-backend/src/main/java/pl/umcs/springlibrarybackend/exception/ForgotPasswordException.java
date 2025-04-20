package pl.umcs.springlibrarybackend.exception;

public class ForgotPasswordException extends RuntimeException {
    public ForgotPasswordException(String message) {
        super(message);
    }
}
