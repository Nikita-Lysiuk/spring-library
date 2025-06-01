package pl.umcs.springlibrarybackend.service.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.mapper.LineItemMapper;
import pl.umcs.springlibrarybackend.model.Cart;
import pl.umcs.springlibrarybackend.property.StripeProperties;
import pl.umcs.springlibrarybackend.service.interfaces.stripe.StripeCheckoutService;

@Service
@RequiredArgsConstructor
public class StripeCheckoutServiceImpl implements StripeCheckoutService {
    private final StripeProperties stripeProperties;
    private final LineItemMapper lineItemMapper;

    @Override
    public Session createCheckoutSession(Cart cart, String orderId) {
        RequestOptions requestOptions = RequestOptions.builder()
                .setApiKey(stripeProperties.getApiKey())
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(stripeProperties.getSuccessUrl())
                .setCancelUrl(stripeProperties.getCancelUrl())
                .setCurrency("usd")
                .addAllLineItem(lineItemMapper.toLineItems(cart))
                .putMetadata("order_id", orderId)
                .build();

        try {
            return Session.create(params, requestOptions);
        } catch (StripeException e) {
            throw new RuntimeException("Stripe checkout session failed", e);
        }
    }
}
