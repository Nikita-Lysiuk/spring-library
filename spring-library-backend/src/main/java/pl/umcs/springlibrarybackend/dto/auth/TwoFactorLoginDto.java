package pl.umcs.springlibrarybackend.dto.auth;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TwoFactorLoginDto {
    @Size(min = 6, max = 6, message = "PIN must be 6 digits long")
    private String pin;

    @UUID(message = "Invalid UUID format")
    private String userId;
}
