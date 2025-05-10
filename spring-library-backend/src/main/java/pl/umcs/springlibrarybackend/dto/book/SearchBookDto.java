package pl.umcs.springlibrarybackend.dto.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchBookDto {
    private String id;
    private String title;
    private String coverUrl;
}