package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Review;

public interface ReviewRepository extends JpaRepository<Review, String> {
    void deleteByBookIdAndUserId(String bookId, String userId);
    Review findByBookIdAndUserId(String bookId, String userId);
}
