package pl.umcs.springlibrarybackend.service.interfaces;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface MetaService<T> {
    T create(String name);
    List<T> getMeta(String search, Pageable pageable);
    Set<T> getMeta(List<String> ids);
}
