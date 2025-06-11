package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.dto.note.NoteDto;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.NoteService;

@RestController
@RequestMapping("/api/books/{bookId}/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping("/{page}")
    public NoteDto getNote(
            @PathVariable String bookId,
            @PathVariable int page,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ) {
        return noteService.getNote(bookId, page, userDetails.getId());
    }

    @PutMapping("/{page}")
    public ResponseEntity<Void> updateNote(
            @PathVariable String bookId,
            @PathVariable int page,
            @RequestBody NoteDto dto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        noteService.updateNote(bookId, page, userDetails.getUser(), dto);
        return ResponseEntity.ok().build();
    }
}
