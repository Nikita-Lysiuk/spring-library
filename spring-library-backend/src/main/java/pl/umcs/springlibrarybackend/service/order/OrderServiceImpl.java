package pl.umcs.springlibrarybackend.service.order;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.mapper.OrderItemMapper;
import pl.umcs.springlibrarybackend.model.*;
import pl.umcs.springlibrarybackend.model.enums.PaymentStatus;
import pl.umcs.springlibrarybackend.repository.OrderItemRepository;
import pl.umcs.springlibrarybackend.repository.OrderRepository;
import pl.umcs.springlibrarybackend.service.interfaces.OrderService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderItemMapper orderItemMapper;


    @Override
    public Order createOrder(User user, Cart cart) {
        Order order = Order.builder()
                .user(user)
                .total(BigDecimal.ZERO)
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }

    @Override
    public void cancelOrder(String orderId) {
        Order order = getOrder(orderId);

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot cancel a paid order");
        }

        order.setStatus(PaymentStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public void addItemToOrder(String orderId, CartItem cartItem) {
        Order order = getOrder(orderId);

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot add items to a completed order");
        }

        OrderItem orderItem = orderItemMapper.toOrderItem(cartItem, order);
        orderItemRepository.save(orderItem);
        order.setTotal(order.getTotal().add(orderItem.getTotalPrice()));
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public void addAllItemsToOrder(String orderId, List<CartItem> cartItems) {
        Order order = getOrder(orderId);

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot add items to a completed order");
        }

        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> orderItemMapper.toOrderItem(cartItem, order))
                .toList();

        orderItemRepository.saveAll(orderItems);

        BigDecimal totalPrice = orderItems.stream()
                        .map(OrderItem::getTotalPrice)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotal(order.getTotal().add(totalPrice));
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public Order getOrder(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
    }

    @Override
    public Order getOrderByStripeId(String stripeId) {
        return orderRepository.findByStripeSessionId(stripeId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with Stripe ID: " + stripeId));
    }

    @Override
    public void addStripeSessionIdToOrder(String orderId, String sessionId) {
        Order order = getOrder(orderId);

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot add session ID to a completed order");
        }

        order.setStripeSessionId(sessionId);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public void addPaymentMethodToOrderByOrderId(String orderId, String paymentMethod) {
        Order order = getOrder(orderId);
        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot add payment method to a completed order");
        }

        order.setPaymentMethod(paymentMethod);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public void addPaymentMethodToOrderByStripeId(String stripeId, String paymentMethod) {
        Order order = orderRepository.findByStripeSessionId(stripeId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with Stripe ID: " + stripeId));

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Cannot add payment method to a completed order");
        }

        order.setPaymentMethod(paymentMethod);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }

    @Override
    public void updateOrderStatus(String orderId, PaymentStatus status) {
        Order order = getOrder(orderId);

        if (order.getStatus() == PaymentStatus.COMPLETED && status != PaymentStatus.CANCELLED) {
            throw new IllegalStateException("Cannot update a completed order to a non-cancelled status");
        }

        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(order);
    }
}
