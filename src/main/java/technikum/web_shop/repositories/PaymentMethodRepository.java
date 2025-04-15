package technikum.web_shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import technikum.web_shop.model.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

}
