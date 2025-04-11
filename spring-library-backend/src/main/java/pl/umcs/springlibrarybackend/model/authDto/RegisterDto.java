package pl.umcs.springlibrarybackend.model.authDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotBlank(message = "First name cannot be blank")
    @Size(min = 1, max = 50, message = "First name must be between 1 and 25 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 1, max = 50, message = "Last name must be between 1 and 25 characters")
    private String lastName;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}
