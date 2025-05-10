package pl.umcs.springlibrarybackend.service.book;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.book.SearchBookDto;
import pl.umcs.springlibrarybackend.dto.book.CreateBookDto;
import pl.umcs.springlibrarybackend.mapper.SearchBookMapper;
import pl.umcs.springlibrarybackend.model.Book;
import pl.umcs.springlibrarybackend.repository.BookRepository;
import pl.umcs.springlibrarybackend.service.diff.GoogleDriveService;
import pl.umcs.springlibrarybackend.service.diff.PdfService;
import pl.umcs.springlibrarybackend.service.diff.S3Service;
import pl.umcs.springlibrarybackend.service.interfaces.BookService;
import pl.umcs.springlibrarybackend.utils.Utils;
import pl.umcs.springlibrarybackend.utils.factory.BookFactory;

import java.io.File;
import java.io.IOException;
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

    @Override
    public void uploadBook(MultipartFile pdf, String book) throws IOException {
        CreateBookDto createBookDto = objectMapper.readValue(book, new TypeReference<>() {});
        File file = Utils.convertMultipartFileToFile(pdf);
        String googleDriveId = googleDriveService.uploadPdf(file, pdf.getOriginalFilename());
        File coverImage = pdfService.getCoverImage(file);
        Integer numberOfPages = pdfService.getNumberOfPages(file);
        String coverImageUrl = s3Service.uploadFile(coverImage);


        Book bookToSave = bookFactory.create(
                createBookDto,
                coverImageUrl,
                googleDriveId,
                numberOfPages
        );

        bookRepository.save(bookToSave);
        try {
            if (!file.delete()) {
                log.warn("Failed to delete file: {}", file.getAbsolutePath());
            }
            if (!coverImage.delete()) {
                log.warn("Failed to delete cover image: {}", coverImage.getAbsolutePath());
            }
        } catch (Exception e) {
            log.error("Exception while deleting temp files", e);
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
}
