package pl.umcs.springlibrarybackend.utils.factory;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.book.CreateBookDto;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.service.meta.AuthorService;
import pl.umcs.springlibrarybackend.service.meta.CategoryService;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class BookFactory {
    private final AuthorService authorService;
    private final CategoryService categoryService;

    public Book create(CreateBookDto dto, String coverUrl, String googleDriveId, Integer pageCount) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setDescription(dto.getDescription());
        book.setPublishedDate(dto.getPublishedDate());
        book.setPublisher(dto.getPublisher());
        book.setCoverUrl(coverUrl);
        book.setGooglePdfId(googleDriveId);
        book.setLanguage(dto.getLanguage());
        book.setPrice(BigDecimal.valueOf(dto.getPrice()));
        book.setPageCount(pageCount);
        book.setCreatedAt(LocalDateTime.now());
        book.setUpdatedAt(LocalDateTime.now());
        book.setAuthors(authorService.getMeta(dto.getAuthorIds()));
        book.setCategories(categoryService.getMeta(dto.getCategoryIds()));
        return book;
    }
}
