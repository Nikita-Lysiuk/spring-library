package pl.umcs.springlibrarybackend.service.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.CartException;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Cart;
import pl.umcs.springlibrarybackend.model.CartItem;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.repository.CartItemRepository;
import pl.umcs.springlibrarybackend.repository.CartRepository;
import pl.umcs.springlibrarybackend.service.interfaces.CartService;
import pl.umcs.springlibrarybackend.service.interfaces.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;

    @Override
    public void addToCart(String bookId, String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));

        Optional<CartItem> cartItem = cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId);

        if (cartItem.isPresent()) {
            throw new CartException("You have already added this book to your cart.");
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setCart(cart);
        Book book = bookRepository.findById(bookId)
                        .orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + bookId));
        newCartItem.setBook(book);
        newCartItem.setQuantity(1);

        cartItemRepository.save(newCartItem);
    }

    @Override
    public void removeFromCart(String bookId, String userId) {

    }

    @Override
    public void clearCart(String userId) {

    }

    @Override
    public List<CartItem> getCartItems(String userId) {
        return List.of();
    }

    private Cart createCartForUser(String userId) {
        User user = userService.getUserById(userId);
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }
}
