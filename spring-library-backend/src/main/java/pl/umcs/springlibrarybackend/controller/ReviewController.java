package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.review.CreateReviewDto;
import pl.umcs.springlibrarybackend.dto.review.ReviewDto;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addReview(
        @RequestBody CreateReviewDto reviewDto,
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        reviewService.addReview(reviewDto.getBookId(), userDetails.getUser(), reviewDto.getRating(), reviewDto.getComment());
        return ResponseEntity.ok(ApiResponse.success("Review added successfully"));
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<?>> getReviews(
            @PathVariable String bookId
    ) {
        List<ReviewDto> reviews = reviewService.getReviews(bookId);

        return ResponseEntity.ok(
                ApiResponse.success("Reviews found successfully", reviews)
        );
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable String reviewId) {
        reviewService.deleteReview(reviewId);

        return ResponseEntity.ok(
                ApiResponse.success("Review deleted successfully")
        );
    }
}
