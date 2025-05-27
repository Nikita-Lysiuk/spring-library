package pl.umcs.springlibrarybackend.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.review.ReviewDto;
import pl.umcs.springlibrarybackend.model.Review;

import java.time.format.DateTimeFormatter;

@Component
@AllArgsConstructor
public class ReviewMapper {
    private final UserMapper userMapper;
    private final BookMapper bookMapper;

    public ReviewDto toDto(Review review) {
        return new ReviewDto(
                review.getId(),
                userMapper.toDto(review.getUser()),
                bookMapper.toDto(review.getBook()),
                review.getRating(),
                review.getContent(),
                review.getCreatedAt().format(DateTimeFormatter.ISO_DATE)
        );
    }
}
