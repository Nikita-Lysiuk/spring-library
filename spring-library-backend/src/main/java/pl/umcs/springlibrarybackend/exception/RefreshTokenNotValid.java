package pl.umcs.springlibrarybackend.exception;

public class RefreshTokenNotValid extends RuntimeException {
    public RefreshTokenNotValid(String message) {
        super(message);
    }
}
