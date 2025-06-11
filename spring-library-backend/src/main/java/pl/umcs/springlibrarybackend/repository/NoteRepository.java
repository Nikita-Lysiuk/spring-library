package pl.umcs.springlibrarybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.umcs.springlibrarybackend.model.Note;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, String> {
    Optional<Note> findByBookIdAndPageNumberAndUserId(String bookId, int pageNumber, String userId);
}
