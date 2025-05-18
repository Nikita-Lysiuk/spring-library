package pl.umcs.springlibrarybackend.dto.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReviewDto {
    private String bookId;
    private int rating;
    private String comment;
}
