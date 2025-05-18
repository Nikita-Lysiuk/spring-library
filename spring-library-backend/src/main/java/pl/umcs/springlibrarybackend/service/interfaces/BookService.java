package pl.umcs.springlibrarybackend.service.interfaces;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.book.BookDto;
import pl.umcs.springlibrarybackend.dto.book.BookFilterRequest;
import pl.umcs.springlibrarybackend.dto.book.BookFilterResponse;
import pl.umcs.springlibrarybackend.dto.book.SearchBookDto;

import java.io.IOException;
import java.util.List;

public interface BookService {
    void uploadBook(MultipartFile pdf, String book) throws IOException;
    List<SearchBookDto> searchBook(String query);
    BookFilterResponse filterBooks(BookFilterRequest books, Pageable pageable);
    BookDto getBookById(String id);
}
