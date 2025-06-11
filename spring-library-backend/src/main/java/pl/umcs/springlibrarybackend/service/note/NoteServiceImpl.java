package pl.umcs.springlibrarybackend.service.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.dto.note.NoteDto;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.model.Note;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.NoteRepository;
import pl.umcs.springlibrarybackend.service.interfaces.BookService;
import pl.umcs.springlibrarybackend.service.interfaces.NoteService;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;
    private final BookService bookService;

    @Override
    public NoteDto getNote(String bookId, int pageNumber, String userId) {
        return noteRepository.findByBookIdAndPageNumberAndUserId(bookId, pageNumber, userId)
                .map(note -> new NoteDto(note.getContent()))
                .orElse(new NoteDto(""));
    }

    @Override
    public void updateNote(String bookId, int pageNumber, User user, NoteDto noteDto) {
        Note note = noteRepository.findByBookIdAndPageNumberAndUserId(bookId, pageNumber, user.getId())
                .orElse(new Note());

        Book book = bookService.getBookById(bookId);

        if (book == null) {
            throw new RuntimeException("Book not found");
        }

        note.setBook(book);
        note.setPageNumber(pageNumber);
        note.setUser(user);
        note.setContent(noteDto.getText());

        noteRepository.save(note);
    }
}
