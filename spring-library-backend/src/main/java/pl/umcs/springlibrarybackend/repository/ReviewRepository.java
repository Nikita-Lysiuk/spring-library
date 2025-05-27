package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Review;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, String> {
    void deleteByBookIdAndUserId(String bookId, String userId);
    List<Review> findByBookIdAndUserId(String bookId, String userId);

    @EntityGraph(attributePaths = {"user", "book"})
    List<Review> findByBookId(String bookId, Pageable pageable);
}
