package pl.umcs.springlibrarybackend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.model.auth.CustomUserDetails;
import pl.umcs.springlibrarybackend.model.auth.OAuth2UserDetailsAdapter;
import pl.umcs.springlibrarybackend.security.interfaces.JwtService;
import pl.umcs.springlibrarybackend.security.interfaces.RefreshTokenService;

import java.io.IOException;

/**
 * This class handles the success of OAuth2 authentication.
 * It checks if user is existed in the database and if not, it creates a new user.
 * after that it generates JWT token and directs to frontend with tokens in parameters.
 */
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2UserDetailsAdapter userDetails = (OAuth2UserDetailsAdapter) authentication.getPrincipal();
        CustomUserDetails customUserDetails = userDetails.getUserDetails();

        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(
                customUserDetails,
                null,
                customUserDetails.getAuthorities()
        );

        String accessToken = jwtTokenProvider.generateToken(authenticationToken);
        String refreshToken = refreshTokenService.createRefreshToken(customUserDetails.getUser()).getToken();

        String redirectUrl = String.format("%s/oauth2-redirect?accessToken=%s&refreshToken=%s",
                frontendUrl,
                accessToken,
                refreshToken);

        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect(redirectUrl);
    }
}
