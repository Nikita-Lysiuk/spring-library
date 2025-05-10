package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    @EntityGraph(attributePaths = {"authors", "categories"})
    List<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
