package pl.umcs.springlibrarybackend.utils.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class QRCodeUtils {
    public static byte[] generateQRCode(String otpAuthUrl) throws WriterException, IOException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(otpAuthUrl, BarcodeFormat.QR_CODE, 200, 200);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", stream);
        return stream.toByteArray();
    }

    public static String generateBase32QRCode(byte[] qrCodeBytes) {
        return "data:image/png;base64," + java.util.Base64.getEncoder().encodeToString(qrCodeBytes);
    }
}
