package pl.umcs.springlibrarybackend.exception;

public class CartException extends RuntimeException {
    public CartException(String message) {
        super(message);
    }
}
