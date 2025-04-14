package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
