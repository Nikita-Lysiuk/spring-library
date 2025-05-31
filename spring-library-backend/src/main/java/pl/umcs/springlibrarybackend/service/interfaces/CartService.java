package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;

import java.util.List;

public interface CartService {
    void addToCart(String bookId, String userId);
    void removeFromCart(String bookId, String userId);
    void clearCart(String userId);
    CartDto getCartDetails(String userId);
    List<CartItemDto> getCartItems(String userId);
}
