package pl.umcs.springlibrarybackend.service.diff;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.service.interfaces.BlackListService;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class BlackListServiceImpl implements BlackListService {
    private final RedisService redisService;

    @Override
    public void addToBlackList(String token, long expirationTime) {
        redisService.set(token, "blacklisted", Duration.ofMillis(expirationTime));
    }

    @Override
    public boolean isBlackListed(String token) {
        return redisService.exists(token) && redisService.get(token) != null;
    }
}
