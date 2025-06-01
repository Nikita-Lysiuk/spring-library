package pl.umcs.springlibrarybackend.service.stripe;

import com.stripe.model.Event;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeEventProcessor;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripeEventProcessorImpl implements StripeEventProcessor {
    private final PaymentSuccessHandler paymentSuccessHandler;
    private final PaymentFailedHandler paymentFailedHandler;

    @Override
    public void processEvent(Event event) {
        switch (event.getType()) {
            case "payment_intent.succeeded" -> paymentSuccessHandler.handle(event);
            case "payment_intent.payment_failed" -> paymentFailedHandler.handle(event);
            default -> log.warn("Unhandled event type: {}", event.getType());
        }
    }
}
