package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.meta.Author;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, String> {
    List<Author> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Author> findByNameContainingIgnoreCase(String name);
}
