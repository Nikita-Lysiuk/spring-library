package pl.umcs.springlibrarybackend.dto.cart;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddToCartRequest {
    @NotBlank(message = "Book ID cannot be blank")
    @Size(max = 36, message = "Book ID must be a valid UUID")
    private String bookId;
}
