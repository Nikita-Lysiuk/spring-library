package pl.umcs.springlibrarybackend.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.umcs.springlibrarybackend.utils.interfaces.OAuth2UserInfoExtractor;

import java.util.Map;

@Configuration
public class OAuth2ExtractorConfig {

    @Bean
    public Map<String, OAuth2UserInfoExtractor> extractors(
            @Qualifier("google") OAuth2UserInfoExtractor googleExtractor,
            @Qualifier("github") OAuth2UserInfoExtractor githubExtractor
    ) {
        return Map.of(
                "google", googleExtractor,
                "github", githubExtractor
        );
    }
}
