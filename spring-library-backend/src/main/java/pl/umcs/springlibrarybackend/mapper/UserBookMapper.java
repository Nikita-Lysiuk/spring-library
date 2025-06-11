package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.userbook.UserBookDto;
import pl.umcs.springlibrarybackend.model.UserBook;

@Component
public class UserBookMapper {
    public UserBookDto toDto(UserBook userBook) {
        if (userBook == null) {
            return null;
        }

        return UserBookDto.builder()
                .id(userBook.getId())
                .bookId(userBook.getBook().getId())
                .title(userBook.getBook().getTitle())
                .coverUrl(userBook.getBook().getCoverUrl())
                .currentPage(userBook.getCurrentPage())
                .totalPages(userBook.getBook().getPageCount())
                .build();
    }
}
