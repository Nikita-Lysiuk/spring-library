package pl.umcs.springlibrarybackend.service.interfaces;

import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.book.SearchBookDto;

import java.io.IOException;
import java.util.List;

public interface BookService {
    void uploadBook(MultipartFile pdf, String book) throws IOException;
    List<SearchBookDto> searchBook(String query);
}
