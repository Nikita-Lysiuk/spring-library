package pl.umcs.springlibrarybackend.service.diff;

import lombok.extern.log4j.Log4j2;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Service
@Log4j2
public class PdfService {

    public File getCoverImage(ByteArrayOutputStream file) {
        try (PDDocument document = PDDocument.load(file.toByteArray())) {
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

    public Integer getNumberOfPages(ByteArrayOutputStream file) {
        try (PDDocument document = PDDocument.load(file.toByteArray())) {
            return document.getNumberOfPages();
        } catch (IOException e) {
            log.error("Failed to load PDF document while getting number of pages: {}", e.getMessage());
            throw new RuntimeException("Failed to load PDF document while getting number of pages", e);
        }
    }

    public byte[] getPdfSample(ByteArrayOutputStream file) {
        try (

                PDDocument document = PDDocument.load(file.toByteArray());
                PDDocument sampleDocument = new PDDocument();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
                ) {
            PDPageTree pages = document.getPages();

            for (int i = 0; i < Math.min(15, pages.getCount()); i++) {
                PDPage page = pages.get(i);
                sampleDocument.importPage(page);
            }

            sampleDocument.save(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            log.error("Failed to load PDF document while getting PDF sample: {}", e.getMessage());
            throw new RuntimeException("Failed to load PDF document while getting PDF sample", e);
        }
    }
}
