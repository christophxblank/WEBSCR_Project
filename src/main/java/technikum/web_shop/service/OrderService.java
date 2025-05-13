// src/main/java/technikum/web_shop/service/OrderService.java
package technikum.web_shop.service;

import org.springframework.stereotype.Service;
import technikum.web_shop.dto.CartItem;
import technikum.web_shop.model.*;
import technikum.web_shop.repositories.*;

import jakarta.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepo;
    private final ItemRepository  itemRepo;
    private final UserRepository  userRepo;

    public OrderService(OrderRepository orderRepo,
                        ItemRepository itemRepo,
                        UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.itemRepo  = itemRepo;
        this.userRepo  = userRepo;
    }

    public Order createOrder(List<CartItem> cartItems, HttpSession session) {
        Order order = new Order();
        // 1) User aus Session
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId != null) {
            userRepo.findById(userId).ifPresent(order::setUser);
        }
        // 2) Datum & Items
        order.setOrderDate(LocalDate.now());
        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> oiList = new ArrayList<>();
        for (CartItem ci : cartItems) {
            Item item = itemRepo.findById(ci.getItem().getId()).orElseThrow();
            OrderItem oi = new OrderItem();
            oi.setItem(item);
            oi.setQuantity(ci.getQuantity());
            oi.setPrice(item.getPrice());
            oi.setOrder(order);

            oiList.add(oi);
            // total darf hier verändert werden
            total = total.add(item.getPrice().multiply(BigDecimal.valueOf(ci.getQuantity())));
        }

        order.setOrderItems(oiList);
        order.setTotalPrice(total);
        return orderRepo.save(order);
    }
}
