package pl.umcs.springlibrarybackend.service.review;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.dto.review.ReviewDto;
import pl.umcs.springlibrarybackend.mapper.ReviewMapper;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Review;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.repository.ReviewRepository;
import pl.umcs.springlibrarybackend.service.interfaces.ReviewService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final ReviewMapper reviewMapper;

    @Override
    public void addReview(String bookId, User user, int rating, String comment) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found"));

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setRating(rating);
        review.setContent(comment);

        reviewRepository.save(review);
    }

    @Override
    public void deleteReview(String reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found"));

        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewDto> getReviews(String bookId) {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        List<Review> reviews = reviewRepository.findByBookId(bookId, pageable);

        if (reviews.isEmpty()) {
            return List.of();
        }

        return reviews.stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Override
    public List<Review> getUserReviews(String userId) {
        return List.of();
    }
}
