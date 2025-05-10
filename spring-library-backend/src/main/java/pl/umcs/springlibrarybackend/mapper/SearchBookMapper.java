package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.book.SearchBookDto;
import pl.umcs.springlibrarybackend.model.Book;

@Component
public class SearchBookMapper {
    public SearchBookDto toDto(Book book) {
        return new SearchBookDto(
                book.getId(),
                book.getTitle(),
                book.getCoverUrl()
        );
    }
}
