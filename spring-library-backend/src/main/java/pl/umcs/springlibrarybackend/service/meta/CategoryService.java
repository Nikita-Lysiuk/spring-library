package pl.umcs.springlibrarybackend.service.meta;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.umcs.springlibrarybackend.model.meta.Category;
import pl.umcs.springlibrarybackend.repository.CategoryRepository;
import pl.umcs.springlibrarybackend.service.interfaces.MetaService;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryService implements MetaService<Category> {
    private final CategoryRepository categoryRepository;

    @Override
    public Category create(String name) {
        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getMeta(String search) {
        Pageable pageable = PageRequest.of(0, 5);
        return categoryRepository.findByNameContainingIgnoreCase(search, pageable);
    }

    @Override
    public Set<Category> getMeta(List<String> ids) {
        return Set.copyOf(categoryRepository.findAllById(ids));
    }
}
