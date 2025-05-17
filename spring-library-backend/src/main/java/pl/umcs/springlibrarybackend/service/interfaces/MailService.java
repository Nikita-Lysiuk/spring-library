package pl.umcs.springlibrarybackend.service.interfaces;

import pl.umcs.springlibrarybackend.dto.mail.MailRequest;

public interface MailService {
    void sendEmail(MailRequest request);
}
