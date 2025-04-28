package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
