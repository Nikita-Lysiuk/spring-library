package pl.umcs.springlibrarybackend.service.diff;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.mail.MailRequest;
import pl.umcs.springlibrarybackend.service.interfaces.MailService;
import pl.umcs.springlibrarybackend.utils.interfaces.MailTemplateEngine;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;
    private final MailTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    public void sendEmail(MailRequest mailRequest) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(mailRequest.getTo());
            helper.setSubject(mailRequest.getSubject());

            String body = templateEngine.render(mailRequest.getTemplateName(), mailRequest.getVariables());
            helper.setText(body, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Error creating MimeMessageHelper: {}", e.getMessage());
        }
    }
}
