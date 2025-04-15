package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Adress;

public interface AdressRepository extends JpaRepository<Adress, Integer> {
}
