package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.book.BookFilterDto;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Review;

@Component
public class FilterBookMapper {
    public BookFilterDto toDto(Book book) {
        return new BookFilterDto(
                book.getId(),
                book.getTitle(),
                book.getCoverUrl(),
                book.getReviews().stream()
                        .map(Review::getRating)
                        .reduce(0, Integer::sum).doubleValue() / book.getReviews().size(),
                book.getReviews().size(),
                book.getPrice().doubleValue(),
                book.getPublisher()
        );
    }
}
