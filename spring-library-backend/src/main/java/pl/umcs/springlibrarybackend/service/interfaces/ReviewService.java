package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.review.ReviewDto;
import pl.umcs.springlibrarybackend.model.Review;
import pl.umcs.springlibrarybackend.model.User;

import java.util.List;

public interface ReviewService {
    void addReview(String bookId, User user, int rating, String comment);
    void deleteReview(String reviewId);
    List<ReviewDto> getReviews(String bookId);
    List<Review> getUserReviews(String userId);
}
