package pl.umcs.springlibrarybackend.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import pl.umcs.springlibrarybackend.utils.interfaces.MailTemplateEngine;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ThymeleafMailTemplateEngine implements MailTemplateEngine {

    private final TemplateEngine templateEngine;

    @Override
    public String render(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(templateName, context);
    }
}
