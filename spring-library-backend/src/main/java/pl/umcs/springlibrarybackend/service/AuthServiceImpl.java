package pl.umcs.springlibrarybackend.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.UserAlreadyExistsException;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.authDto.LoginDto;
import pl.umcs.springlibrarybackend.model.authDto.RegisterDto;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;

import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    @Override
    public String register(RegisterDto registerDto) {
        String fullName = String.format("%s %s", registerDto.getFirstName(), registerDto.getLastName());
        var user = userRepository.findByEmail(registerDto.getEmail());

        if (user.isPresent()) {
            throw new UserAlreadyExistsException("User with this email already exists");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("User Role not set."));

        var newUser = new User();
        newUser.setEmail(registerDto.getEmail());
        newUser.setFullName(fullName);
        newUser.setPassword(hashPassword(registerDto.getPassword()));
        newUser.setRoles(Set.of(userRole));
        newUser.setAvatarUrl(null);

        userRepository.save(newUser);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerDto.getEmail(),
                        registerDto.getPassword()
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
