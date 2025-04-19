package pl.umcs.springlibrarybackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.auth.AuthProvider;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.OAuth2UserDetailsAdapter;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.utils.OAuth2UserExtractorFactory;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
    private final OAuth2UserExtractorFactory oAuth2UserExtractorFactory;
    private final DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String email = oAuth2UserExtractorFactory.extractEmail(provider, oAuth2User, userRequest);
        User user = userRepository.findByEmail(email)
                .orElseGet(() ->
                        userRepository.save(
                                oAuth2UserExtractorFactory.extractUser(provider, oAuth2User, email)
                        ));

        if (user.getProvider() == AuthProvider.LOCAL) {
            oAuth2UserExtractorFactory.updateProvider(provider, user, oAuth2User);
        }

        return new OAuth2UserDetailsAdapter(new CustomUserDetails(user), oAuth2User.getAttributes(), null, null);
    }
}
