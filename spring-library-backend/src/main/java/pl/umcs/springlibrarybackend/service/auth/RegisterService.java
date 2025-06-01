package pl.umcs.springlibrarybackend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.umcs.springlibrarybackend.exception.UserAlreadyExistsException;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.AuthProvider;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.dto.auth.JwtAuthResponse;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.utils.refreshToken.RefreshTokenManager;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class RegisterService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenManager refreshTokenManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public JwtAuthResponse register(String firstName, String lastName, String email, String password) {
        String fullName = firstName + " " + lastName;

        userRepository.findByEmail(email).ifPresent( user -> {
            throw new UserAlreadyExistsException("User with this email already exists");
        });

        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(role));
        user.setProvider(AuthProvider.LOCAL);
        user.setAvatarUrl(null);

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.generateToken(authentication);
        RefreshToken refreshToken = refreshTokenManager.createRefreshToken(user);

        return new JwtAuthResponse(accessToken, refreshToken.getToken());
    }
}
