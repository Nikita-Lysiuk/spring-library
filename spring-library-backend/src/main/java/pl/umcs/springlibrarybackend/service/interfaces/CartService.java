package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;
import pl.umcs.springlibrarybackend.dto.cart.CheckoutResponse;

import java.util.List;

public interface CartService {
    void addToCart(String bookId, String userId);
    void removeFromCart(String bookId, String userId);
    void clearCart(String cartId);
    CartDto getCartDetails(String userId);
    List<CartItemDto> getCartItems(String userId);
    CheckoutResponse createCheckoutSession(String cartId);
}
