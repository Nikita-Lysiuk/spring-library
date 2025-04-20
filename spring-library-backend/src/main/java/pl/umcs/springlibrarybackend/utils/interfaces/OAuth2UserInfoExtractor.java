package pl.umcs.springlibrarybackend.utils.interfaces;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import pl.umcs.springlibrarybackend.model.User;

/**
 * Interface for extracting user information from OAuth2User.
 */
public interface OAuth2UserInfoExtractor {
    String extractEmail(OAuth2User oAuth2User, OAuth2UserRequest userRequest);
    boolean supports(String provider);
    User extract(String email, OAuth2User oAuth2User);
    void updateProvider(User user, OAuth2User oAuth2User);
}
