package pl.umcs.springlibrarybackend.model.mail;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Builder
@Getter
@Setter
public class MailRequest {
    private String to;
    private String subject;
    private String templateName;
    private Map<String, Object> variables;
}
