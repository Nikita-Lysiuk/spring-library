package pl.umcs.springlibrarybackend.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "stripe")
public class StripeProperties {
    private String apiKey;
    private String webhookSecret;
    private String successUrl;
    private String cancelUrl;
}
