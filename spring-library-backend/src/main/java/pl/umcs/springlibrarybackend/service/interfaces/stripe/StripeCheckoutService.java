package pl.umcs.springlibrarybackend.service.interfaces.stripe;

import com.stripe.model.checkout.Session;
import pl.umcs.springlibrarybackend.model.Cart;

public interface StripeCheckoutService {
    Session createCheckoutSession(Cart cart, String orderId);
}
