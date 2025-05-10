package pl.umcs.springlibrarybackend.service.interfaces;

import java.util.List;
import java.util.Set;

public interface MetaService<T> {
    T create(String name);
    List<T> getMeta(String search);
    Set<T> getMeta(List<String> ids);
}
