package technikum.web_shop.dto;

import java.math.BigDecimal;

public record OrderItemDTO(
        Integer id,
        String productName,
        int quantity,
        BigDecimal price
) {}