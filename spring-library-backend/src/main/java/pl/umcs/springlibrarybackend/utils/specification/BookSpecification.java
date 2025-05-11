package pl.umcs.springlibrarybackend.utils.specification;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import pl.umcs.springlibrarybackend.dto.book.BookFilterRequest;
import pl.umcs.springlibrarybackend.model.Book;

import java.util.ArrayList;
import java.util.List;

public class BookSpecification {
    public static Specification<Book> build(BookFilterRequest req) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (req.getAuthors() != null && !req.getAuthors().isEmpty()) {
                predicates.add(
                        root.join("authors").get("id").in(req.getAuthors())
                );
            }

            if (req.getCategories() != null && !req.getCategories().isEmpty()) {
                predicates.add(
                        root.join("categories").get("id").in(req.getCategories())
                );
            }

            if (req.getLanguages() != null && !req.getLanguages().isEmpty()) {
                predicates.add(
                        root.get("language").in(req.getLanguages())
                );
            }

            if (req.getPriceFrom() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("price"), req.getPriceFrom())
                );
            }

            if (req.getPriceTo() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("price"), req.getPriceTo())
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
