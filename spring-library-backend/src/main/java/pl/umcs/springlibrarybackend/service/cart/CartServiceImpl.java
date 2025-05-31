package pl.umcs.springlibrarybackend.service.cart;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;
import pl.umcs.springlibrarybackend.exception.CartException;
import pl.umcs.springlibrarybackend.mapper.CartMapper;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Cart;
import pl.umcs.springlibrarybackend.model.CartItem;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.repository.CartItemRepository;
import pl.umcs.springlibrarybackend.repository.CartRepository;
import pl.umcs.springlibrarybackend.service.interfaces.CartService;
import pl.umcs.springlibrarybackend.service.interfaces.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final CartItemRepository cartItemRepository;
    private final BookRepository bookRepository;
    private final CartMapper cartMapper;

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
    public CartDto getCartDetails(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));

        return cartMapper.toDto(cart.getItems());
    }

    @Transactional
    @Override
    public void removeFromCart(String bookId, String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartException("Cart not found for user: " + userId));

        CartItem cartItem = cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId)
                .orElseThrow(() -> new CartException("Book not found in cart: " + bookId));


        cart.getItems().remove(cartItem);
    }

    @Override
    public void clearCart(String userId) {

    }

    @Override
    public List<CartItemDto> getCartItems(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));

        return cartMapper.toItemDtos(cart.getItems());
    }

    private Cart createCartForUser(String userId) {
        User user = userService.getUserById(userId);
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }
}
