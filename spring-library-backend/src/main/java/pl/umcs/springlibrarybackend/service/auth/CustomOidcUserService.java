package pl.umcs.springlibrarybackend.service.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.AuthProvider;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.OAuth2UserDetailsAdapter;
import pl.umcs.springlibrarybackend.repository.UserRepository;
import pl.umcs.springlibrarybackend.utils.factory.OAuth2UserExtractorFactory;

@Service
@RequiredArgsConstructor
public class CustomOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {
    private final UserRepository userRepository;
    private final OAuth2UserExtractorFactory oAuth2UserExtractorFactory;
    private final OidcUserService delegate = new OidcUserService();

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getRegistrationId();
        OidcUser oidcUser = delegate.loadUser(userRequest);

        String email = oAuth2UserExtractorFactory.extractEmail(
                provider,
                oidcUser,
                userRequest
        );

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(
                        oAuth2UserExtractorFactory.extractUser(provider, oidcUser, email)
                ));

        if (user.getProvider() == AuthProvider.LOCAL) {
            oAuth2UserExtractorFactory.updateProvider(provider, user, oidcUser);
        }

        return new OAuth2UserDetailsAdapter(new CustomUserDetails(user), oidcUser.getAttributes(), oidcUser.getIdToken(), oidcUser.getUserInfo());
    }
}
