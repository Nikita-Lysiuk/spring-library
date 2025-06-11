package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.userbook.UserBookDto;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookPdfDto;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface UserBookService {
    void addBookToUser(User user, Book book, LocalDateTime purchasedDate);
    UserBookPdfDto getUserBookPdf(User user, String bookId) throws IOException;
    void removeBookFromUser(User user, Book book);
    boolean isBookInUserCollection(User user, Book book);
    List<UserBookDto> getUserBooks(User user);
    void updateCurrentPage(User user, String bookId, int newCurrentPage);
}
