package pl.umcs.springlibrarybackend.service.interfaces.stripe;

import com.stripe.model.Event;

public interface StripeEventProcessor {
    void processEvent(Event event);
}
