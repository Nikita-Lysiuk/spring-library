package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.meta.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {
    List<Category> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Category> findByNameContainingIgnoreCase(String name);
}
