package pl.umcs.springlibrarybackend.utils.factory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import pl.umcs.springlibrarybackend.model.Role;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.AuthProvider;
import pl.umcs.springlibrarybackend.repository.RoleRepository;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.utils.interfaces.OAuth2UserInfoExtractor;

import java.util.*;

@Component
@Qualifier("github")
@Slf4j
@RequiredArgsConstructor
public class GithubOAuth2UserInfoExtractor implements OAuth2UserInfoExtractor {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String GITHUB_API_URL = "https://api.github.com/user/emails";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public String extractEmail(OAuth2User oAuth2User, OAuth2UserRequest userRequest) {
        String email = oAuth2User.getAttribute("email");

        if (email == null) {
            // GitHub does not provide email if user has not set it to public

            log.info("Email not found in OAuth2 user attributes for GitHub. Attempting to fetch from /user/emails endpoint.");
            try {
                String accessToken = userRequest.getAccessToken().getTokenValue();

                HttpHeaders headers = new HttpHeaders();
                headers.setBearerAuth(accessToken);
                headers.set("Accept", "application/vnd.github+json");
                headers.set("User-Agent", "SpringLibraryBackend");

                HttpEntity<String> entity = new HttpEntity<>(headers);

                ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                        GITHUB_API_URL,
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<>() {}
                );

                if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                    List<Map<String, Object>> emails = response.getBody();
                    for (var emailEntry : emails) {
                        if (Boolean.TRUE.equals(emailEntry.get("primary")) && Boolean.TRUE.equals(emailEntry.get("verified"))) {
                            email = (String) emailEntry.get("email");
                            log.info("Primary verified email found: {}", email);
                            break;
                        }
                    }
                }

                if (email == null) {
                    log.warn("No primary verified email found in Github response. ");
                    throw new OAuth2AuthenticationException("Email not found in OAuth2 user attributes");
                }
            } catch (Exception e) {
                log.error("Failed to fetch email from GitHub /user/emails endpoint", e);
                throw new OAuth2AuthenticationException("Failed to fetch email from GitHub API." + e.getMessage());
            }
        }

        return email;
    }

    @Override
    public boolean supports(String provider) {
        return "github".equalsIgnoreCase(provider);
    }

    @Override
    public User extract(String email, OAuth2User oAuth2User) {
        User user = new User();
        user.setFullName(oAuth2User.getAttribute("name"));
        user.setEmail(email);
        user.setPassword(UUID.randomUUID().toString());
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        user.setRoles(Set.of(role));
        user.setProvider(AuthProvider.GITHUB);
        user.setProviderId(Objects.requireNonNull(oAuth2User.getAttribute("id")).toString());
        user.setAvatarUrl(oAuth2User.getAttribute("avatar_url"));

        return user;
    }

    @Override
    public void updateProvider(User user, OAuth2User oAuth2User) {
        user.setProvider(AuthProvider.GITHUB);
        user.setProviderId(Objects.requireNonNull(oAuth2User.getAttribute("id")).toString());
        userRepository.save(user);
    }
}
