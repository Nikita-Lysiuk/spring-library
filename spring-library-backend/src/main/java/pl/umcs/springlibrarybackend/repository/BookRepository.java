package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, String> {
    @EntityGraph(attributePaths = {"authors", "categories"})
    List<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @EntityGraph(attributePaths = {"authors", "categories", "reviews"})
    Page<Book> findAll(Specification<Book> specification, Pageable pageable);

    @EntityGraph(attributePaths = {"authors", "categories", "reviews"})
    Optional<Book> findWithDetailsById(String id);
}
