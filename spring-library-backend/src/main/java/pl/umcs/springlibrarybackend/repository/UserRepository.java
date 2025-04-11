package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
}

