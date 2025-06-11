package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.UserBook;

import java.util.List;
import java.util.Optional;

public interface UserBookRepository extends JpaRepository<UserBook, String> {
    boolean existsUserBookByBookAndUser(Book book, User user);
    List<UserBook> findAllByUser(User user, Sort sort);
    Optional<UserBook> findByUserAndBookId(User user, String bookId);
}
