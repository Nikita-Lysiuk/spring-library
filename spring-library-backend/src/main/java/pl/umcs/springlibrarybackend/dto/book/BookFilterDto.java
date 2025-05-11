package pl.umcs.springlibrarybackend.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class BookFilterDto {
    private String id;
    private String title;
    private String coverUrl;
    private Double averageRating;
    private Integer numberOfRatings;
    private Double price;
    private String publisher;
}
