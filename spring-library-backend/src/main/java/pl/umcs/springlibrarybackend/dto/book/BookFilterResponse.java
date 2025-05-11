package pl.umcs.springlibrarybackend.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BookFilterResponse {
    private List<BookFilterDto> books;
    private long totalPages;
}
