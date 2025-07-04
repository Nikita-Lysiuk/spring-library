package pl.umcs.springlibrarybackend.service.diff;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.property.GoogleDriveProperties;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Base64;
import java.util.List;

@Service
public class GoogleDriveService {
    private final GoogleDriveProperties googleDriveProperties;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = List.of(DriveScopes.DRIVE);

    private final Drive driveService;

    public GoogleDriveService(GoogleDriveProperties googleDriveProperties) throws IOException, GeneralSecurityException {
        this.googleDriveProperties = googleDriveProperties;
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        final GoogleCredentials credentials = GoogleCredentials
                .fromStream(new FileInputStream(googleDriveProperties.getServiceAccountKeyFile()))
                .createScoped(SCOPES);

        this.driveService = new Drive.Builder(
                HTTP_TRANSPORT,
                JSON_FACTORY,
                new HttpCredentialsAdapter(credentials)
        ).setApplicationName(googleDriveProperties.getApplicationName()).build();
    }


    public String uploadPdf(ByteArrayOutputStream outputStream, String fileName) throws IOException {
        File fileMetadata = new File()
                .setName(fileName)
                .setMimeType("application/pdf")
                .setParents(List.of(googleDriveProperties.getFolderId()));

        ByteArrayContent mediaContent = new ByteArrayContent("application/pdf", outputStream.toByteArray());

        File uploadFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        return uploadFile.getId();
    }

    public ByteArrayOutputStream getFileById(String fileId) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        driveService.files().get(fileId)
                .executeMediaAndDownloadTo(outputStream);

        return outputStream;
    }

    public String convertStreamToBase64(ByteArrayOutputStream outputStream) {
        return Base64.getEncoder().encodeToString(outputStream.toByteArray());
    }
}
