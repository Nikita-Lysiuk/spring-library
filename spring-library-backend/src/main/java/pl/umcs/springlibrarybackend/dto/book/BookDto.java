package pl.umcs.springlibrarybackend.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.umcs.springlibrarybackend.model.Review;
import pl.umcs.springlibrarybackend.model.meta.Author;
import pl.umcs.springlibrarybackend.model.meta.Category;

import java.util.Base64;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
    private String id;
    private String title;
    private String publisher;
    private String publishedDate;
    private String description;
    private String language;
    private Double price;
    private String coverImageUrl;
    private Integer pageCount;
    private Double averageRating;
    private Integer reviewCount;

    private List<Author> authors;
    private List<Category> categories;

}
