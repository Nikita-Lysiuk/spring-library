package pl.umcs.springlibrarybackend.model;


import jakarta.persistence.*;
import lombok.Data;
import pl.umcs.springlibrarybackend.converter.StringListJsonConverter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "external_books")
public class ExternalBook {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private String id;

    @Column(name = "external_id", nullable = false)
    private String externalId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "published_date", nullable = false)
    private LocalDate publishedDate;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "authors", columnDefinition = "LONGTEXT")
    @Convert(converter = StringListJsonConverter.class)
    private List<String> authors;

    @Column(name = "categories", columnDefinition = "LONGTEXT")
    @Convert(converter = StringListJsonConverter.class)
    private List<String> categories;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "cover_url")
    private String coverUrl;

    @Column(name = "language")
    private String language;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "buy_link")
    private String buyLink;
}
