package pl.umcs.springlibrarybackend.exception;

public class CustomAuthException extends RuntimeException {
    public CustomAuthException(String message) {
        super(message);
    }
}
