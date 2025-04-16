package pl.umcs.springlibrarybackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties
public class SpringLibraryBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringLibraryBackendApplication.class, args);
    }
}
