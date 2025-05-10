package pl.umcs.springlibrarybackend.utils.factory;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.utils.interfaces.OAuth2UserInfoExtractor;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2UserExtractorFactory {
    private final Map<String, OAuth2UserInfoExtractor> extractors;

    public String extractEmail(String provider, OAuth2User oAuth2User, OAuth2UserRequest userRequest) {
        OAuth2UserInfoExtractor extractor = extractors.get(provider);
        if (extractor == null) {
            throw new IllegalArgumentException("No extractor found for provider: " + provider);
        }
        return extractor.extractEmail(oAuth2User, userRequest);
    }

    public User extractUser(String provider, OAuth2User oAuth2User, String email) {
        OAuth2UserInfoExtractor extractor = extractors.get(provider);
        if (extractor == null) {
            throw new IllegalArgumentException("No extractor found for provider: " + provider);
        }
        return extractor.extract(email, oAuth2User);
    }

    public void updateProvider(String provider, User user, OAuth2User oAuth2User) {
        OAuth2UserInfoExtractor extractor = extractors.get(provider);
        if (extractor == null) {
            throw new IllegalArgumentException("No extractor found for provider: " + provider);
        }
        extractor.updateProvider(user, oAuth2User);
    }
}
