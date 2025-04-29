package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {
}
