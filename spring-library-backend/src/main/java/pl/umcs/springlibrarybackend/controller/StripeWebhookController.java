package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.property.StripeProperties;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeWebhookHandler;

@RestController
@RequestMapping("/api/stripe/webhook")
@RequiredArgsConstructor
public class StripeWebhookController {
    private final StripeWebhookHandler stripeWebhookHandler;
    private final StripeProperties stripeProperties;

    @PostMapping
    public void handleStripeWebhook(@RequestBody String jsonPayload, @RequestHeader("Stripe-Signature") String signatureHeader) {
        stripeWebhookHandler.handleEvent(jsonPayload, signatureHeader);
    }
}
