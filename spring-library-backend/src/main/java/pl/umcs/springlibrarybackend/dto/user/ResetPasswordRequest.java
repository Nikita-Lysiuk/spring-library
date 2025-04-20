package pl.umcs.springlibrarybackend.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {
    @NotBlank(message = "Email cannot be blank")
    private String password;

    @NotBlank(message = "Email cannot be blanj")
    @UUID(message = "Invalid UUID format")
    private String token;
}
