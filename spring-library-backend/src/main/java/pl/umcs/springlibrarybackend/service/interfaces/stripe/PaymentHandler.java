package pl.umcs.springlibrarybackend.service.interfaces.stripe;

import com.stripe.model.Event;

public interface PaymentHandler {
    void handle(Event event);
}
