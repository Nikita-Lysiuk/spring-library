package pl.umcs.springlibrarybackend.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.exception.UserAlreadyExistsException;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.model.authDto.JwtAuthResponse;
import pl.umcs.springlibrarybackend.model.authDto.LoginDto;
import pl.umcs.springlibrarybackend.model.authDto.RegisterDto;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.service.interfaces.AuthService;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;

import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenService refreshTokenService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                ));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + loginDto.getEmail()));

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        return new JwtAuthResponse(accessToken, refreshToken.getToken());
    }

    @Override
    public JwtAuthResponse register(RegisterDto registerDto) {
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
        String accessToken = jwtTokenProvider.generateToken(authentication);

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(newUser);
        return new JwtAuthResponse(accessToken, refreshToken.getToken());
    }

    @Override
    public boolean validateAccessToken(String token) {
        String tokenWithoutBearer = token.substring(7);
        return jwtTokenProvider.validateToken(tokenWithoutBearer);
    }

    @Override
    public JwtAuthResponse refreshToken(String refreshToken) throws RefreshTokenNotValid {
        refreshTokenService.validateRefreshToken(refreshToken);
        User user = refreshTokenService.getUserFromToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

        var authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );

        String accessToken = jwtTokenProvider.generateToken(authenticationToken);
        String newRefreshToken = refreshTokenService.createRefreshToken(user).getToken();
        refreshTokenService.revokeToken(refreshToken);
        return new JwtAuthResponse(accessToken, newRefreshToken);
    }

    @Override
    public void logout(String token, String refreshToken) {
        String accessToken = token.substring(7);
        jwtTokenProvider.addAccessTokenToBlackList(accessToken);
        User user = refreshTokenService.getUserFromToken(refreshToken);
        refreshTokenService.revokeAllUserTokens(user);
        SecurityContextHolder.clearContext();
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
