package pl.umcs.springlibrarybackend.model.authDto;

public record ForgotPasswordResponse(
        boolean success,
        String message
) {
}
