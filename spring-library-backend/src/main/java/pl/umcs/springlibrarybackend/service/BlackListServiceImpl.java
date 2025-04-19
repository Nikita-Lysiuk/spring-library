package pl.umcs.springlibrarybackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.service.interfaces.BlackListService;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BlackListServiceImpl implements BlackListService {
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void addToBlackList(String token, long expirationTime) {
        redisTemplate.opsForValue().set(token, "blacklisted", expirationTime, TimeUnit.MILLISECONDS);
    }

    @Override
    public boolean isBlackListed(String token) {
        return redisTemplate.hasKey(token) && redisTemplate.opsForValue().get(token) != null;
    }
}
