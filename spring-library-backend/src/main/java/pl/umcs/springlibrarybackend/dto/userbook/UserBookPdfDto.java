package pl.umcs.springlibrarybackend.dto.userbook;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserBookPdfDto {
    private String pdfBase64;
}
