package pl.umcs.springlibrarybackend.exception;

public class OAuthOnlyAccountException extends RuntimeException {
    public OAuthOnlyAccountException(String message) {
        super(message);
    }
}
