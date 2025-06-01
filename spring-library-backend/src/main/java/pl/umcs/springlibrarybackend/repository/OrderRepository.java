package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Order;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, String> {
    Optional<Order> findByStripeSessionId(String stripeSessionId);
}
