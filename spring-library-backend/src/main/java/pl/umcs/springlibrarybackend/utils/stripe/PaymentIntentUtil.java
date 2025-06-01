package pl.umcs.springlibrarybackend.utils.stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionListParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.property.StripeProperties;

@Component
@RequiredArgsConstructor
public class PaymentIntentUtil {
    private final StripeProperties stripeProperties;

    public Session fetchSessionByPaymentIntent(PaymentIntent intent) throws StripeException {
        SessionListParams params = SessionListParams.builder()
                .setLimit(1L)
                .setPaymentIntent(intent.getId())
                .build();

        RequestOptions requestOptions = RequestOptions.builder()
                .setApiKey(stripeProperties.getApiKey())
                .build();

        return Session.list(params, requestOptions).getData().getFirst();
    }
}
