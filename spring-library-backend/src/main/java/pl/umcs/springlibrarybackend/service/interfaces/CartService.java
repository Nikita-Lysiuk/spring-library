package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.model.CartItem;

import java.util.List;

public interface CartService {
    void addToCart(String bookId, String userId);
    void removeFromCart(String bookId, String userId);
    void clearCart(String userId);
    List<CartItem> getCartItems(String userId);
}
