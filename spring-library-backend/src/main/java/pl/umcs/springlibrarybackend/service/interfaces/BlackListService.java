package pl.umcs.springlibrarybackend.service.interfaces;

public interface BlackListService {
    void addToBlackList(String token, long expirationTime);
    boolean isBlackListed(String token);
}
