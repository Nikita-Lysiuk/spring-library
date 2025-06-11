package pl.umcs.springlibrarybackend.dto.userbook;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserBookDto {
    private String id;
    private String bookId;
    private Integer currentPage;
    private Integer totalPages;
    private String coverUrl;
    private String title;
}
