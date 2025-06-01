package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.UserBook;

public interface UserBookRepository extends JpaRepository<UserBook, String> {
    boolean existsUserBookByBookAndUser(Book book, User user);
}
