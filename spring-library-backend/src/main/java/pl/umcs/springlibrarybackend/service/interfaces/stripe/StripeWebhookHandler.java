package pl.umcs.springlibrarybackend.service.interfaces.stripe;

public interface StripeWebhookHandler {
    void handleEvent(String payload, String signature);
}
