package pl.umcs.springlibrarybackend.service.diff;

import lombok.extern.log4j.Log4j2;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
@Log4j2
public class PdfService {

    public File getCoverImage(File file) {
        try (PDDocument document = PDDocument.load(file)) {
            PDFRenderer renderer = new PDFRenderer(document);

            BufferedImage image = renderer.renderImage(0, 4);
            File coverImageFile = File.createTempFile("coverImage", ".png");
            ImageIO.write(image, "PNG", coverImageFile);
            return coverImageFile;
        } catch (IOException e) {
            log.error("Failed to load PDF document while getting cover image: {}", e.getMessage());
            throw new RuntimeException("Failed to load PDF document while getting cover image", e);
        }
    }

    public Integer getNumberOfPages(File file) {
        try (PDDocument document = PDDocument.load(file)) {
            return document.getNumberOfPages();
        } catch (IOException e) {
            log.error("Failed to load PDF document while getting number of pages: {}", e.getMessage());
            throw new RuntimeException("Failed to load PDF document while getting number of pages", e);
        }
    }
}
