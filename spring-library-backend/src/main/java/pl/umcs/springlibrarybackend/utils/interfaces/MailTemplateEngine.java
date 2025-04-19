package pl.umcs.springlibrarybackend.utils.interfaces;

import java.util.Map;

public interface MailTemplateEngine {
    String render(String templateName, Map<String, Object> variables);
}
