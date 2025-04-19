package pl.umcs.springlibrarybackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.exception.CustomAuthException;
import pl.umcs.springlibrarybackend.exception.OAuthOnlyAccountException;
import pl.umcs.springlibrarybackend.exception.RefreshTokenNotValid;
import pl.umcs.springlibrarybackend.exception.UserAlreadyExistsException;
import pl.umcs.springlibrarybackend.model.auth.AuthProvider;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.RefreshToken;
import pl.umcs.springlibrarybackend.model.authDto.JwtAuthResponse;
import pl.umcs.springlibrarybackend.model.authDto.LoginDto;
import pl.umcs.springlibrarybackend.model.authDto.RegisterDto;
import pl.umcs.springlibrarybackend.model.mail.MailRequest;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.security.JwtTokenProvider;
import pl.umcs.springlibrarybackend.service.interfaces.AuthService;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;
import pl.umcs.springlibrarybackend.service.interfaces.MailService;

import java.time.Duration;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RefreshTokenService refreshTokenService;
    private final MailService mailService;
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        // TODO if two-factor is enabled redirect to 2fa page
        // TODO add isTwoFactorEnabled to user in CustomUserDetails and jwt token
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    ));
        } catch (BadCredentialsException e) {
            throw new CustomAuthException("Invalid username or password");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.generateToken(authentication);

        User user = ((CustomUserDetails) authentication.getPrincipal()).getUser();

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new OAuthOnlyAccountException("User is authenticated with OAuth2 provider. Please use OAuth2 login.");
        }

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
        newUser.setProvider(AuthProvider.LOCAL);
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
        UserDetails userDetails = new CustomUserDetails(user);

        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(
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

    @Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomAuthException("User with this email does not exist"));

        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new OAuthOnlyAccountException("User is authenticated with OAuth2 provider. Please use OAuth2 login.");
        }

        String token = UUID.randomUUID().toString();
        String redisKey = "forgot-password:" + token;
        redisTemplate.opsForValue().set(redisKey, user.getEmail(), Duration.ofMinutes(15));
        String resetLink = String.format("%s/reset-password?token=%s", frontendUrl, token);

        mailService.sendEmail(MailRequest.builder()
                .to(user.getEmail())
                .subject("Reset your password")
                .templateName("forgot-password")
                .variables(Map.of(
                        "username", user.getFullName(),
                        "resetLink", resetLink
                )).build());
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
