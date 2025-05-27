package pl.umcs.springlibrarybackend.dto.review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.umcs.springlibrarybackend.dto.book.BookDto;
import pl.umcs.springlibrarybackend.dto.user.UserDto;

@Setter
@Getter
@AllArgsConstructor
public class ReviewDto {
    private String id;
    private UserDto user;
    private BookDto book;
    private int rating;
    private String content;
    private String createdAt;
}
