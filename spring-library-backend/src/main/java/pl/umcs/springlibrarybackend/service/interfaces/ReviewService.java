package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.model.User;

public interface ReviewService {
    void addReview(String bookId, User user, int rating, String comment);
    void deleteReview(String bookId);
    void getReviews(String bookId);
    void getUserReviews(String userId);
}
