package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(String name);
}
