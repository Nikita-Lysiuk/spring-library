package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.note.NoteDto;
import pl.umcs.springlibrarybackend.model.User;

public interface NoteService {
    NoteDto getNote(String bookId, int pageNumber, String userId);
    void updateNote(String bookId, int pageNumber, User user, NoteDto noteDto);
}
