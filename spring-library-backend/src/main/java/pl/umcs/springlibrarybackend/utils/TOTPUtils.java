package pl.umcs.springlibrarybackend.utils;

import com.eatthepath.otp.HmacOneTimePasswordGenerator;
import org.apache.commons.codec.binary.Base32;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.SecureRandom;
import java.time.Instant;

public class TOTPUtils {
    public static String generateSecret() {
        SecureRandom random  = new SecureRandom();
        byte[] secretKey = new byte[20];
        random.nextBytes(secretKey);
        Base32 base32 = new Base32();
        return base32.encodeToString(secretKey).replace("=", "");
    }

    public static String getOtpAuthUrl(String userEmail, String secret) {
        return String.format(
                "otpauth://totp/%s?secret=%s&issuer=StringLibrary",
                userEmail,
                secret
        );
    }

    public static boolean verifyCode(String base32Secret, String code) throws InvalidKeyException {
        Base32 base32 = new Base32();
        byte[] decodedKey = base32.decode(base32Secret);
        Key key = new SecretKeySpec(decodedKey, "HmacSHA1");

        HmacOneTimePasswordGenerator otpGenerator = new HmacOneTimePasswordGenerator();
        long currentInterval = Instant.now().getEpochSecond() / 30;

        int generatedCode = otpGenerator.generateOneTimePassword(key, currentInterval);
        return String.valueOf(generatedCode).equals(code);
    }
}
