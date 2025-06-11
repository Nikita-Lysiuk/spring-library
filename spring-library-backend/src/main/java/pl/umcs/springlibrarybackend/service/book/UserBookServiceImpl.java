package pl.umcs.springlibrarybackend.service.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookDto;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookPdfDto;
import pl.umcs.springlibrarybackend.mapper.UserBookMapper;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.UserBook;
import pl.umcs.springlibrarybackend.repository.UserBookRepository;
import pl.umcs.springlibrarybackend.service.diff.GoogleDriveService;
import pl.umcs.springlibrarybackend.service.interfaces.UserBookService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserBookServiceImpl implements UserBookService {
    private final UserBookRepository userBookRepository;
    private final UserBookMapper userBookMapper;
    private final GoogleDriveService googleDriveService;

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
    public List<UserBookDto> getUserBooks(User user) {
        return userBookRepository.findAllByUser(user, Sort.by("currentPage").descending().and(Sort.by("purchasedDate").descending()))
                .stream()
                .map(userBookMapper::toDto)
                .toList();
    }

    @Override
    public UserBookPdfDto getUserBookPdf(User user, String bookId) throws IOException {
        UserBook userBook = userBookRepository.findByUserAndBookId(user, bookId)
                .orElseThrow(() -> new RuntimeException("User does not have this book in their collection"));

        ByteArrayOutputStream pdfStream = googleDriveService.getFileById(userBook.getBook().getGooglePdfId());

        if (pdfStream == null) {
            throw new RuntimeException("PDF file not found for book with ID: " + bookId);
        }

        String pdfBase64 = googleDriveService.convertStreamToBase64(pdfStream);

        return new UserBookPdfDto(pdfBase64);
    }

    @Override
    public void updateCurrentPage(User user, String bookId, int newCurrentPage) {
        UserBook userBook = userBookRepository.findByUserAndBookId(user, bookId)
                .orElseThrow(() -> new RuntimeException("User does not have this book in their collection"));

        userBook.setCurrentPage(newCurrentPage);
        userBookRepository.save(userBook);
    }
}
