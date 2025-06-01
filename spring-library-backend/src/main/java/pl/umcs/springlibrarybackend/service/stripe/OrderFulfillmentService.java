package pl.umcs.springlibrarybackend.service.stripe;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.Order;
import pl.umcs.springlibrarybackend.model.OrderItem;
import pl.umcs.springlibrarybackend.model.enums.PaymentStatus;
import pl.umcs.springlibrarybackend.service.interfaces.OrderService;
import pl.umcs.springlibrarybackend.service.interfaces.UserBookService;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OrderFulfillmentService {
    private final OrderService orderService;
    private final UserBookService userBookService;

    public void fulfillOrder(String orderId, String paymentMethodType) {
        Order order = orderService.getOrder(orderId);
        if (order.getStatus() == PaymentStatus.COMPLETED) {
            return;
        }

        orderService.addPaymentMethodToOrderByOrderId(orderId, paymentMethodType);
        orderService.updateOrderStatus(orderId, PaymentStatus.COMPLETED);

        for (OrderItem item : order.getItems()) {
            userBookService.addBookToUser(order.getUser(), item.getBook(), LocalDateTime.now());
        }
    }
}
