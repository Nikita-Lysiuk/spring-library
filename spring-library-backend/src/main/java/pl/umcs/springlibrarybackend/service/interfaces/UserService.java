package pl.umcs.springlibrarybackend.service.interfaces;

import org.springframework.web.multipart.MultipartFile;
import pl.umcs.springlibrarybackend.dto.user.Enable2FAResponse;
import pl.umcs.springlibrarybackend.model.User;

import java.io.IOException;

public interface UserService {
    User getCurrentUser();
    void updateUser(String id, MultipartFile file, String fullName, String email) throws IOException;
    Enable2FAResponse enable2FA();
    void validate2FA(String code);
    void disable2FA(String code);
}
