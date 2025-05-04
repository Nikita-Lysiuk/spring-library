package pl.umcs.springlibrarybackend.service.interfaces;

import java.util.List;

public interface MetaService<T> {
    T create(String name);
    List<T> getMeta(String search);
}
