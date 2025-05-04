package pl.umcs.springlibrarybackend.dto.meta;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateMetaRequest {
    @NotBlank(message = "Meta name cannot be blank")
    private String name;
}
