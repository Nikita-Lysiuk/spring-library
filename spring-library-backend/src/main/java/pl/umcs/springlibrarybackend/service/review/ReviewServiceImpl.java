package pl.umcs.springlibrarybackend.service.review;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Review;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.repository.ReviewRepository;
import pl.umcs.springlibrarybackend.service.interfaces.ReviewService;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

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
    public void deleteReview(String bookId) {

    }

    @Override
    public void getReviews(String bookId) {

    }

    @Override
    public void getUserReviews(String userId) {

    }
}
