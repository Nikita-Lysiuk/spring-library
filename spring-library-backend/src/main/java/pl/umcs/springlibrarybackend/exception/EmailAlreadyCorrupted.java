package pl.umcs.springlibrarybackend.exception;

public class EmailAlreadyCorrupted extends RuntimeException {
    public EmailAlreadyCorrupted(String message) {
        super(message);
    }
}
