package pl.umcs.springlibrarybackend.service.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.UserBook;
import pl.umcs.springlibrarybackend.repository.UserBookRepository;
import pl.umcs.springlibrarybackend.service.interfaces.UserBookService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookServiceImpl implements UserBookService {
    private final UserBookRepository userBookRepository;

    @Override
    public void addBookToUser(User user, Book book, LocalDateTime purchasedDate) {
        UserBook userBook = new UserBook();
        userBook.setUser(user);
        userBook.setBook(book);
        userBook.setCurrentPage(0);
        userBook.setPurchasedDate(purchasedDate);

        userBookRepository.save(userBook);
    }

    @Override
    public void removeBookFromUser(User user, Book book) {

    }

    @Override
    public boolean isBookInUserCollection(User user, Book book) {
        return userBookRepository.existsUserBookByBookAndUser(book, user);
    }

    @Override
    public List<UserBook> getUserBooks(User user) {
        return List.of();
    }

}
