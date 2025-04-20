package pl.umcs.springlibrarybackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.ResetPasswordException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.service.interfaces.UserService;
import pl.umcs.springlibrarybackend.utils.RedisUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


}
