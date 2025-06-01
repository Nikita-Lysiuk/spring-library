package pl.umcs.springlibrarybackend.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;
import pl.umcs.springlibrarybackend.model.CartItem;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CartMapper {
    private final BookMapper bookMapper;

    public CartDto toDto(String cartId, List<CartItem> cartItems) {
        double totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getBook().getPrice().doubleValue() * item.getQuantity())
                .sum();
        int totalQuantity = cartItems.stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        return new CartDto(cartId, totalPrice, totalQuantity);
    }

    public List<CartItemDto> toItemDtos(List<CartItem> cartItems) {
        return cartItems.stream()
                .map(item -> {
                    CartItemDto dto = new CartItemDto();
                    dto.setBookDto(bookMapper.toDto(item.getBook()));
                    dto.setQuantity(item.getQuantity());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
