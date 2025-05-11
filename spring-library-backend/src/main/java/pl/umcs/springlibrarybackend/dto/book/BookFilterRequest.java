package pl.umcs.springlibrarybackend.dto.book;

import lombok.Data;

import java.util.List;

@Data
public class BookFilterRequest {
    private List<String> authors;
    private List<String> categories;
    private List<String> languages;

    private Double priceFrom = 0.0;
    private Double priceTo = Double.MAX_VALUE;
}
