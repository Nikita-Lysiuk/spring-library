package pl.umcs.springlibrarybackend.service.book;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.book.*;
import pl.umcs.springlibrarybackend.mapper.BookMapper;
import pl.umcs.springlibrarybackend.mapper.FilterBookMapper;
import pl.umcs.springlibrarybackend.mapper.SearchBookMapper;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.service.diff.GoogleDriveService;
import pl.umcs.springlibrarybackend.service.diff.PdfService;
import pl.umcs.springlibrarybackend.service.diff.S3Service;
import pl.umcs.springlibrarybackend.service.interfaces.BookService;
import pl.umcs.springlibrarybackend.utils.specification.BookSpecification;
import pl.umcs.springlibrarybackend.utils.factory.BookFactory;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final ObjectMapper objectMapper;
    private final GoogleDriveService googleDriveService;
    private final PdfService pdfService;
    private final S3Service s3Service;
    private final BookRepository bookRepository;
    private final BookFactory bookFactory;
    private final SearchBookMapper searchBookMapper;
    private final FilterBookMapper filterBookMapper;
    private final BookMapper bookMapper;

    @Override
    public void uploadBook(MultipartFile pdf, String book) {
        try {
            CreateBookDto createBookDto = objectMapper.readValue(book, new TypeReference<>() {});
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            pdf.getInputStream().transferTo(outputStream);
            String googleDriveId = googleDriveService.uploadPdf(outputStream, pdf.getOriginalFilename());
            File coverImage = pdfService.getCoverImage(outputStream);
            Integer numberOfPages = pdfService.getNumberOfPages(outputStream);
            String coverImageUrl = s3Service.uploadFile(coverImage);


            Book bookToSave = bookFactory.create(
                    createBookDto,
                    coverImageUrl,
                    googleDriveId,
                    numberOfPages
            );

            bookRepository.save(bookToSave);
            log.info("Book uploaded successfully: {}", bookToSave.getTitle());
        } catch (IOException ex) {
            log.error("Failed to upload book: {}", ex.getMessage());
            throw new RuntimeException("Failed to upload book", ex);
        }
    }

    @Override
    public List<SearchBookDto> searchBook(String query) {
        Pageable pageable = PageRequest.of(0, 10);
        List<Book> books = bookRepository.findByTitleContainingIgnoreCase(query, pageable);
        return books.stream()
                .map(searchBookMapper::toDto)
                .toList();
    }

    @Override
    public BookFilterResponse filterBooks(
            BookFilterRequest bookFilterRequest,
            Pageable pageable
    ) {
        Specification<Book> spec = BookSpecification.build(bookFilterRequest);
        Page<Book> pageResult = bookRepository.findAll(spec, pageable);

        return new BookFilterResponse(
                pageResult.getContent().stream()
                        .map(filterBookMapper::toDto)
                        .toList(),
                pageResult.getTotalPages()
        );
    }

    @Override
    public BookDto getBookDtoById(String id) {
        Book book = bookRepository.findWithDetailsById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("Book not found with id: " + id));
        return bookMapper.toDto(book);
    }

    @Override
    public Book getBookById(String id) {
        return bookRepository.findWithDetailsById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("Book not found with id: " + id));
    }

    @Override
    public String getBookSamplePdf(String bookId) {
        try {
            Book book = bookRepository
                    .findById(bookId)
                    .orElseThrow(() -> new IndexOutOfBoundsException("Book not found with id: " + bookId));

            ByteArrayOutputStream outputStream = googleDriveService.getFileById(book.getGooglePdfId());
            byte[] bytes = pdfService.getPdfSample(outputStream);
            return Base64.getEncoder().encodeToString(bytes);
        } catch (IOException e) {
            log.error("Failed to get book sample PDF: {}", e.getMessage());
            throw new RuntimeException("Failed to get book sample PDF", e);
        }
    }
}
