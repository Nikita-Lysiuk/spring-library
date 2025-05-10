package pl.umcs.springlibrarybackend.dto.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreateBookDto {
    private String title;
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate publishedDate;
    private String publisher;

    private String language;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Double price;

    private List<String> categoryIds;
    private List<String> authorIds;
}
