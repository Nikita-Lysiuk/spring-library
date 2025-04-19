package pl.umcs.springlibrarybackend.model.auth;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import pl.umcs.springlibrarybackend.model.User;

import java.util.Collection;
import java.util.Map;

/**
 * This class implements adapter pattern for UserDetails and OAuth2User.
 * It allows to use OAuth2User as CustomUserDetails.
 * It will help to authenticate user in OAuth2AuthenticationSuccessHandler.
 */
public class OAuth2UserDetailsAdapter implements OAuth2User, UserDetails, OidcUser {
    @Getter
    private final CustomUserDetails userDetails;
    private final Map<String, Object> attributes;
    private final OidcIdToken idToken;
    private final OidcUserInfo userInfo;

    public OAuth2UserDetailsAdapter(CustomUserDetails userDetails, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) {
        this.userDetails = userDetails;
        this.attributes = attributes;
        this.idToken = idToken;
        this.userInfo = userInfo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userDetails.getAuthorities();
    }

    @Override
    public String getPassword() {
        return userDetails.getPassword();
    }

    @Override
    public String getUsername() {
        return userDetails.getUsername();
    }

    // OAuth2User methods
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return userDetails.getUsername();
    }

    public User getUser() {
        return userDetails.getUser();
    }

    @Override
    public Map<String, Object> getClaims() {
        return attributes;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return userInfo;
    }

    @Override
    public OidcIdToken getIdToken() {
        return idToken;
    }
}
