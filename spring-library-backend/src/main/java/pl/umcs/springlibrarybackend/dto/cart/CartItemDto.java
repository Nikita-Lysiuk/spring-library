package pl.umcs.springlibrarybackend.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.umcs.springlibrarybackend.dto.book.BookDto;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private BookDto bookDto;
    private Integer quantity;
}
