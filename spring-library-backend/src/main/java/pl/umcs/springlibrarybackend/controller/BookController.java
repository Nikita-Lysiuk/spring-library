package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.book.BookFilterRequest;
import pl.umcs.springlibrarybackend.dto.book.BookFilterResponse;
import pl.umcs.springlibrarybackend.dto.book.SearchBookDto;
import pl.umcs.springlibrarybackend.service.interfaces.BookService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ApiResponse<Void>> uploadBook(
            @RequestPart(value = "pdf", required = false) MultipartFile pdf,
            @RequestPart(value = "book", required = false) String book
            ) throws IOException {
        bookService.uploadBook(pdf, book);

        return ResponseEntity.ok(
                ApiResponse.success("Book uploaded successfully")
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<SearchBookDto>>> searchBook(
            @RequestParam(value = "query") String query
    ) {
        List<SearchBookDto> books = bookService.searchBook(query);
        return ResponseEntity.ok(
                ApiResponse.success("Books found", books)
        );
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<BookFilterResponse>> filterBooks(
            @ModelAttribute BookFilterRequest bookFilterRequest,
            @PageableDefault(sort = "publishedDate", direction = Sort.Direction.DESC)Pageable pageable
            ) {
            BookFilterResponse response = bookService.filterBooks(bookFilterRequest, pageable);
        return ResponseEntity.ok(
                ApiResponse.success("Books filtered successfully", response)
        );
    }
}
