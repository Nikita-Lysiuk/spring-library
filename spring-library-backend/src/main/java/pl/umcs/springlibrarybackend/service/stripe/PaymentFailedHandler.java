package pl.umcs.springlibrarybackend.service.stripe;

import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.Order;
import pl.umcs.springlibrarybackend.model.enums.PaymentStatus;
import pl.umcs.springlibrarybackend.service.interfaces.OrderService;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.PaymentHandler;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentFailedHandler implements PaymentHandler {
    private final OrderService orderService;

    @Override
    public void handle(Event event) {
        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
        if (deserializer.getObject().isPresent()) {
            PaymentIntent paymentIntent = (PaymentIntent) deserializer.getObject().get();
            String orderId = paymentIntent.getMetadata().get("order_id");
            if (orderId.isEmpty()) {
                log.warn("Order ID not found in payment intent metadata: {}", paymentIntent.getMetadata());
                return;
            }

            Order order = orderService.getOrder(orderId);
            if (order.getStatus() == PaymentStatus.CANCELLED) {
                log.info("Order {} is already cancelled, skipping update", orderId);
                return;
            }

            orderService.updateOrderStatus(orderId, PaymentStatus.FAILED);
        } else {
            log.warn("PaymentIntent data not found in event: {}", event);
        }
    }
}
