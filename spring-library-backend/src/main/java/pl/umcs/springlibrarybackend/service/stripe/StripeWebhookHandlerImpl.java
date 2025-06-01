package pl.umcs.springlibrarybackend.service.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.property.StripeProperties;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeEventProcessor;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeWebhookHandler;

@Service
@RequiredArgsConstructor
public class StripeWebhookHandlerImpl implements StripeWebhookHandler {
    private final StripeEventProcessor stripeEventProcessor;
    private final StripeProperties stripeProperties;

    @Override
    public void handleEvent(String payload, String signature) {
        try {
            Event event = Webhook.constructEvent(
                payload,
                signature,
                stripeProperties.getWebhookSecret()
            );

            stripeEventProcessor.processEvent(event);
        } catch (StripeException e) {
            throw new RuntimeException("Failed to verify Stripe webhook signature", e);
        }
    }
}
