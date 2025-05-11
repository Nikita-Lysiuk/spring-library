package pl.umcs.springlibrarybackend.service.meta;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.meta.Author;
import pl.umcs.springlibrarybackend.repository.AuthorRepository;
import pl.umcs.springlibrarybackend.service.interfaces.MetaService;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthorService implements MetaService<Author> {
    private final AuthorRepository authorRepository;

    @Override
    public Author create(String name) {
        Author author = new Author();
        author.setName(name);
        return authorRepository.save(author);
    }

    @Override
    public List<Author> getMeta(String search, Pageable pageable) {
        if (pageable.isPaged()){
            return authorRepository.findByNameContainingIgnoreCase(search, pageable);
        } else {
            return authorRepository.findByNameContainingIgnoreCase(search);
        }

    }

    @Override
    public Set<Author> getMeta(List<String> ids) {
        return Set.copyOf(authorRepository.findAllById(ids));
    }
}
