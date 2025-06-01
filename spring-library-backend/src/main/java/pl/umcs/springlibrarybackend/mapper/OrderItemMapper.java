package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.CartItem;
import pl.umcs.springlibrarybackend.model.Order;
import pl.umcs.springlibrarybackend.model.OrderItem;

import java.math.BigDecimal;

@Component
public class OrderItemMapper {
    public OrderItem toOrderItem(CartItem cartItem, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setBook(cartItem.getBook());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setPrice(cartItem.getBook().getPrice());
        orderItem.setTotalPrice(cartItem.getBook().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        orderItem.setOrder(order);
        return orderItem;
    }
}
