package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Address;

public interface AdressRepository extends JpaRepository<Address, Integer> {
}
