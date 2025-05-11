package pl.umcs.springlibrarybackend.utils.utils;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Objects;

@Log4j2
public class Utils {
    public static File convertMultipartFileToFile(MultipartFile file) throws IOException {
        String filePrefix = Objects.requireNonNull(file.getOriginalFilename()).substring(0, file.getOriginalFilename().lastIndexOf('.'));
        File convertedFile = Files.createTempFile(filePrefix, ".pdf").toFile();
        file.transferTo(convertedFile);
        return convertedFile;
    }
}
