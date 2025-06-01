package pl.umcs.springlibrarybackend.mapper;

import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.Cart;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class LineItemMapper {
    public List<SessionCreateParams.LineItem> toLineItems(Cart cart) {
        return cart.getItems().stream()
                .map(item ->
                        SessionCreateParams.LineItem.builder()
                                .setQuantity((long) item.getQuantity())
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency("usd")
                                        .setUnitAmountDecimal(item.getBook().getPrice().multiply(new BigDecimal("100")).setScale(0, RoundingMode.HALF_UP))
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(item.getBook().getTitle())
                                                .addImage(item.getBook().getCoverUrl())
                                                .putMetadata("product_id", item.getBook().getId())
                                                .putMetadata("user_id", cart.getUser().getId())
                                                .build()
                                        )
                                        .build()
                                )
                                .build()

                ).toList();
    }
}
