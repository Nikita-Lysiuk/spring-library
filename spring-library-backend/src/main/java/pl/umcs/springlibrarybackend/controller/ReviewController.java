package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.review.CreateReviewDto;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.ReviewService;

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
        // TODO зробити так щоб коли вертаєш книгу вертався тільки середній рейтинг і кількість
        // TODO в компоненті review вертати відгуки
        reviewService.addReview(reviewDto.getBookId(), userDetails.getUser(), reviewDto.getRating(), reviewDto.getComment());
        return ResponseEntity.ok(ApiResponse.success("Review added successfully"));
    }
}
