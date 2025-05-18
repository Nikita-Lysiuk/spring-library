package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.book.BookDto;
import pl.umcs.springlibrarybackend.model.Book;

@Component
public class BookMapper {
    public BookDto toDto(Book book) {
        return new BookDto(
                book.getId(),
                book.getTitle(),
                book.getPublisher(),
                book.getPublishedDate().format(book.getDateFormatter()),
                book.getDescription(),
                book.getLanguage(),
                book.getPrice().doubleValue(),
                book.getCoverUrl(),
                "",
                book.getPageCount(),
                book.getAuthors().stream().toList(),
                book.getCategories().stream().toList(),
                book.getReviews().stream().toList()
        );
    }
}
