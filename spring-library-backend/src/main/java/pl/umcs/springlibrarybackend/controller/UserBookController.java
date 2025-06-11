package pl.umcs.springlibrarybackend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookDto;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookPdfDto;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.service.interfaces.UserBookService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/user-books")
@RequiredArgsConstructor
public class UserBookController {

    private final UserBookService userBookService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserBookDto>>> getUserBooks(
            @AuthenticationPrincipal CustomUserDetails userDetails
            ) {
        List<UserBookDto> userBooks = userBookService.getUserBooks(userDetails.getUser());
        return ResponseEntity.ok(
                ApiResponse.success("User books found successfully", userBooks)
        );
    }

    @GetMapping("/pdf/{bookId}")
    public ResponseEntity<ApiResponse<UserBookPdfDto>> getUserBookPdf(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String bookId
    ) throws IOException {
        UserBookPdfDto userBookPdf = userBookService.getUserBookPdf(userDetails.getUser(), bookId);
        return ResponseEntity.ok(
                ApiResponse.success("User book PDF found successfully", userBookPdf)
        );
    }

    @PatchMapping("/update-current-page/{bookId}")
    public ResponseEntity<ApiResponse<Void>> updateCurrentPage(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String bookId,
            @RequestParam int newCurrentPage
    ) {
        userBookService.updateCurrentPage(userDetails.getUser(), bookId, newCurrentPage);
        return ResponseEntity.ok(
                ApiResponse.success("Current page updated successfully")
        );
    }
}
