package pl.umcs.springlibrarybackend.dto.user;

public record FetchUser(
        String id,
        String fullName,
        String email,
        String avatarUrl,
        Boolean twoFactorEnabled
) {
}
