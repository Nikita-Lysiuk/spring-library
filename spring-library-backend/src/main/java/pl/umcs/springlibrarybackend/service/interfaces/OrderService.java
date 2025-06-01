package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.model.Cart;
import pl.umcs.springlibrarybackend.model.CartItem;
import pl.umcs.springlibrarybackend.model.Order;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.PaymentStatus;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, Cart cart);
    void cancelOrder(String orderId);
    void addItemToOrder(String orderId, CartItem cartItem);
    void addAllItemsToOrder(String orderId, List<CartItem> cartItems);
    Order getOrder(String orderId);
    Order getOrderByStripeId(String stripeId);
    void addStripeSessionIdToOrder(String orderId, String sessionId);
    void addPaymentMethodToOrderByOrderId(String orderId, String paymentMethod);
    void addPaymentMethodToOrderByStripeId(String stripeId, String paymentMethod);
    void updateOrderStatus(String orderId, PaymentStatus status);
}
