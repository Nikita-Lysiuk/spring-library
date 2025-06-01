package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.UserBook;

import java.time.LocalDateTime;
import java.util.List;

public interface UserBookService {
    void addBookToUser(User user, Book book, LocalDateTime purchasedDate);
    void removeBookFromUser(User user, Book book);
    boolean isBookInUserCollection(User user, Book book);
    List<UserBook> getUserBooks(User user);
}
