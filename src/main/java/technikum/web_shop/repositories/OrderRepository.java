package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.Order;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}

