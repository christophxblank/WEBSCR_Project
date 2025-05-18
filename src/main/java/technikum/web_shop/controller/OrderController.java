
package technikum.web_shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.dto.CartItem;
import technikum.web_shop.dto.OrderDTO;
import technikum.web_shop.dto.OrderItemDTO;
import technikum.web_shop.model.Order;
import technikum.web_shop.service.OrderService;

import jakarta.servlet.http.HttpSession;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> placeOrder(
            @RequestBody List<CartItem> cartItems,
            HttpSession session) {

        // 1) Bestellung anlegen (inkl. Cascade-Persist aller OrderItems)
        Order saved = orderService.createOrder(cartItems, session);

        // 2) Session-Warenkorb leeren
        session.removeAttribute("cart");

        // 3) Nur kurze Antwort für das Frontend
        Map<String, Object> resp = new HashMap<>();
        resp.put("orderId", saved.getId());
        resp.put("total", saved.getTotalPrice());
        resp.put("date", saved.getOrderDate());
        return ResponseEntity.ok(resp);
    }

    @GetMapping
    public List<OrderDTO> getOrdersByUser(@RequestParam("userId") int userId) {
        return orderService.getOrdersByUserId(userId).stream()
                .sorted(Comparator.comparing(Order::getOrderDate).reversed())
                .map(this::toDto)
                .toList();
    }

    /** Eine einzelne Bestellung inkl. Items */
    @GetMapping("/{orderId}")
    public OrderDTO getOrderDetails(@PathVariable int orderId) {
        Order order = orderService.getOrderById(orderId);
        return toDto(order);
    }

    private OrderDTO toDto(Order o) {
        return new OrderDTO(
                o.getId(),
                o.getOrderDate(),
                o.getTotalPrice(),
                o.getOrderItems().stream()
                        .map(i -> new OrderItemDTO(i.getId(), i.getItem().getName(),
                                i.getQuantity(), i.getPrice()))
                        .toList()
        );
    }
    @DeleteMapping("/{orderId}/{itemId}")
    public OrderDTO deleteOrderItem(
            @PathVariable int orderId,
            @PathVariable int itemId) {
        // 1) Im Service das Item löschen
        orderService.deleteOrderItem(orderId, itemId);
        // 2) Aktuellen Stand der Bestellung holen und als DTO zurückgeben
        Order updated = orderService.getOrderById(orderId);
        return toDto(updated);
    }

}
