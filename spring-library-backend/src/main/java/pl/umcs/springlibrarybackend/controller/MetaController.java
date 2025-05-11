package pl.umcs.springlibrarybackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.umcs.springlibrarybackend.dto.ApiResponse;
import pl.umcs.springlibrarybackend.dto.meta.CreateMetaRequest;
import pl.umcs.springlibrarybackend.model.meta.Author;
import pl.umcs.springlibrarybackend.model.meta.Category;
import pl.umcs.springlibrarybackend.service.interfaces.MetaService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/meta")
public class MetaController {
    private final MetaService<Category> categoryService;
    private final MetaService<Author> authorService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategories(
            @RequestParam(value = "search", defaultValue = "") String search,
            Pageable pageable
    ) {
        List<Category> categories = categoryService.getMeta(search, pageable);
        return ResponseEntity.ok(
                ApiResponse.success("Categories retrieved successfully", categories)
        );
    }

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@Valid @RequestBody CreateMetaRequest body) {
        Category category = categoryService.create(body.getName());
        return ResponseEntity.ok(
                ApiResponse.success("Category created successfully", category)
        );
    }

    @GetMapping("/authors")
    public ResponseEntity<ApiResponse<List<Author>>> getAuthors(
            @RequestParam(value = "search", defaultValue = "") String search,
            Pageable pageable
    ) {
        List<Author> authors = authorService.getMeta(search, pageable);
        return ResponseEntity.ok(
                ApiResponse.success("Authors retrieved successfully", authors)
        );
    }

    @PostMapping("/authors")
    public ResponseEntity<ApiResponse<Author>> createAuthor(@Valid @RequestBody CreateMetaRequest body) {
        Author author = authorService.create(body.getName());
        return ResponseEntity.ok(
                ApiResponse.success("Author created successfully", author)
        );
    }
}
