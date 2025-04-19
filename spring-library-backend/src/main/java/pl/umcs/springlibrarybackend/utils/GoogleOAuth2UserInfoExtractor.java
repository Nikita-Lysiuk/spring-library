package pl.umcs.springlibrarybackend.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.AuthProvider;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.utils.interfaces.OAuth2UserInfoExtractor;

import java.util.Set;
import java.util.UUID;

@Component
@Qualifier("google")
@RequiredArgsConstructor
public class GoogleOAuth2UserInfoExtractor implements OAuth2UserInfoExtractor {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public String extractEmail(OAuth2User oAuth2User, OAuth2UserRequest userRequest) {
        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            throw new IllegalArgumentException("Email not found in OAuth2 user attributes");
        }

        return email;
    }
    @Override
    public boolean supports(String provider) {
        return "google".equalsIgnoreCase(provider);
    }

    @Override
    public User extract(String email, OAuth2User oAuth2User) {
        User user = new User();
        user.setFullName(String.format("%s %s", oAuth2User.getAttribute("given_name"), oAuth2User.getAttribute("family_name")));
        user.setEmail(email);
        user.setPassword(UUID.randomUUID().toString());
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        user.setRoles(Set.of(role));
        user.setProvider(AuthProvider.GOOGLE);
        user.setProviderId(oAuth2User.getAttribute("sub"));
        user.setAvatarUrl(oAuth2User.getAttribute("picture"));

        return user;
    }

    @Override
    public void updateProvider(User user, OAuth2User oAuth2User) {
        user.setProvider(AuthProvider.GOOGLE);
        user.setProviderId(oAuth2User.getAttribute("sub"));
        userRepository.save(user);
    }
}
