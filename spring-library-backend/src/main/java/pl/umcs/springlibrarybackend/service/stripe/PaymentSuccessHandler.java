package pl.umcs.springlibrarybackend.service.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.PaymentHandler;
import pl.umcs.springlibrarybackend.utils.stripe.PaymentIntentUtil;


@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentSuccessHandler implements PaymentHandler {
    private final PaymentIntentUtil paymentIntentUtil;
    private final OrderFulfillmentService orderFulfillmentService;

    @Override
    public void handle(Event event) {
        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();

        if (deserializer.getObject().isPresent()) {
            log.warn("PaymentIntent data not found in event: {}", event);
            return;
        }

        PaymentIntent paymentIntent = (PaymentIntent) deserializer.getObject().get();

        Session session;
        try {
            session = paymentIntentUtil.fetchSessionByPaymentIntent(paymentIntent);
        } catch (StripeException e) {
            log.error("Failed to fetch session for PaymentIntent: {}", paymentIntent.getId(), e);
            return;
        }

        String orderId = session.getMetadata().get("order_id");
        if (orderId == null || orderId.isBlank()) {
            log.warn("Order ID not found in payment intent metadata: {}", paymentIntent.getMetadata());
            return;
        }

        log.info("Fulfilling order {} after payment success", orderId);
        orderFulfillmentService.fulfillOrder(orderId, paymentIntent.getPaymentMethodTypes().getFirst());
    }
}
