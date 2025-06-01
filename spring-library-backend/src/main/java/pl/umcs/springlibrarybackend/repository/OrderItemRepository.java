package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
}
