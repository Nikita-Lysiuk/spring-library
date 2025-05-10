package pl.umcs.springlibrarybackend.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "google.drive")
public class GoogleDriveProperties {
    private String serviceAccountKeyFile;
    private String applicationName;
    private String folderId;
}
