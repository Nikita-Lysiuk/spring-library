package pl.umcs.springlibrarybackend.mapper;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.dto.user.UserDto;
import pl.umcs.springlibrarybackend.model.User;

@Component
public class UserMapper {
    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatarUrl() != null ? user.getAvatarUrl() : null
        );
    }
}
