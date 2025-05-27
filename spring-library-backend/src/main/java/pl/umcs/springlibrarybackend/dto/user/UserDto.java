package pl.umcs.springlibrarybackend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserDto {
    private String id;
    private String fullName;
    private String email;
    private String avatarUrl;
}
