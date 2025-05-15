package technikum.web_shop.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderDTO(
        Integer id,
        LocalDate orderDate,
        BigDecimal totalPrice,
        List<OrderItemDTO> items
) {}
