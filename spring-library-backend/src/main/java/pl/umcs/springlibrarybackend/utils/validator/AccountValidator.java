package pl.umcs.springlibrarybackend.utils.validator;

import org.springframework.stereotype.Component;
import pl.umcs.springlibrarybackend.exception.OAuthOnlyAccountException;
import pl.umcs.springlibrarybackend.model.User;
import pl.umcs.springlibrarybackend.model.enums.AuthProvider;

@Component
public class AccountValidator {

    public void validateLocalAccount(User user) {
        if (user.getProvider() != AuthProvider.LOCAL) {
            throw new OAuthOnlyAccountException("User is authenticated with OAuth2 provider. Please use OAuth2 login.");
        }
    }
}
