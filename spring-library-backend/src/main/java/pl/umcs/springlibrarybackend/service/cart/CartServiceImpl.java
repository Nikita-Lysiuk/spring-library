package pl.umcs.springlibrarybackend.service.cart;

import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.umcs.springlibrarybackend.dto.cart.CartDto;
import pl.umcs.springlibrarybackend.dto.cart.CartItemDto;
import pl.umcs.springlibrarybackend.dto.cart.CheckoutResponse;
import pl.umcs.springlibrarybackend.dto.mail.MailRequest;
import pl.umcs.springlibrarybackend.exception.CartException;
import pl.umcs.springlibrarybackend.mapper.CartMapper;
import pl.umcs.springlibrarybackend.model.*;
import pl.umcs.springlibrarybackend.repository.CartItemRepository;
import pl.umcs.springlibrarybackend.repository.CartRepository;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeCheckoutService;
import pl.umcs.springlibrarybackend.service.interfaces.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final UserService userService;
    private final OrderService orderService;
    private final BookService bookService;
    private final CartItemRepository cartItemRepository;
    private final StripeCheckoutService stripeCheckoutService;
    private final MailService mailService;
    private final CartMapper cartMapper;
    private final UserBookService userBookService;

    @Override
    public void addToCart(String bookId, String userId) {
        Cart cart = getOrCreateCart(userId);

        if (cartItemRepository.findByCartIdAndBookId(cart.getId(), bookId).isPresent()) {
            throw new CartException("You have already added this book to your cart.");
        }

        User user = userService.getUserById(userId);
        Book book = bookService.getBookById(bookId);

        if (userBookService.isBookInUserCollection(user, book)) {
            throw new CartException("You already own this book.");
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setBook(book);
        newCartItem.setQuantity(1);
        cartItemRepository.save(newCartItem);
    }

    @Override
    public CartDto getCartDetails(String userId) {
        Cart cart = getOrCreateCart(userId);
        return cartMapper.toDto(cart.getId(), cart.getItems());
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
    public void clearCart(String cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartException("Cart not found with id: " + cartId));

        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Override
    public List<CartItemDto> getCartItems(String userId) {
        Cart cart = getOrCreateCart(userId);
        return cartMapper.toItemDtos(cart.getItems());
    }

    @Override
    public CheckoutResponse createCheckoutSession(String cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartException("Cart not found with id: " + cartId));

        if (cart.getItems().isEmpty()) {
            throw new CartException("Cannot create checkout session for an empty cart.");
        }

        Order order = orderService.createOrder(cart.getUser(), cart);
        orderService.addAllItemsToOrder(order.getId(), cart.getItems());

        Session session = stripeCheckoutService.createCheckoutSession(cart, order.getId());
        orderService.addStripeSessionIdToOrder(order.getId(), session.getId());

        clearCart(cart.getId());
        sendCheckoutEmail(cart.getUser(), session.getUrl());

        return new CheckoutResponse(session.getUrl());
    }

    private Cart getOrCreateCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));
    }

    private Cart createCartForUser(String userId) {
        User user = userService.getUserById(userId);
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCreatedAt(LocalDateTime.now());
        return cartRepository.save(cart);
    }

    private void sendCheckoutEmail(User user, String checkoutUrl) {
        mailService.sendEmail(MailRequest.builder()
                .to(user.getEmail())
                .subject("Payment Confirmation")
                .templateName("checkout-session")
                .variables(Map.of(
                        "username", user.getFullName(),
                        "checkoutUrl", checkoutUrl
                )).build()
        );
    }
}
