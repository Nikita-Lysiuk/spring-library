package pl.umcs.springlibrarybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import pl.umcs.springlibrarybackend.model.meta.Author;
import pl.umcs.springlibrarybackend.model.meta.Category;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "published_date", nullable = false)
    private LocalDate publishedDate;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "cover_url", nullable = false)
    private String coverUrl;

    @Column(name = "google_pdf_id", nullable = false)
    private String googlePdfId;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "page_count", nullable = false)
    private Integer pageCount;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "books_authors",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "books_categories",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    public DateTimeFormatter getDateFormatter() {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd");
    }
}
