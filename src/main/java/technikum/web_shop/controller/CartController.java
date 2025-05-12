package technikum.web_shop.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.dto.CartItem;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.service.ItemService;

import java.util.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final ItemService itemService;
    private static final String CART_ATTR = "cart";

    public CartController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/session")
    public String session(HttpSession session) {
        // sorgt dafür, dass die JSESSIONID gesetzt wird
        session.setAttribute("username", "admin");
        return session.getId();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<String> addToCart(@PathVariable Long id, HttpSession session) {
        @SuppressWarnings("unchecked")
        List<CartItem> cart = (List<CartItem>) session.getAttribute(CART_ATTR);
        if (cart == null) {
            cart = new ArrayList<>();
        }

        ItemDTO dto = itemService.findDtoById(id);
        // prüfen, ob schon im Warenkorb
        Optional<CartItem> existing = cart.stream()
                .filter(ci -> ci.getItem().getId().equals(id))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + 1);
        } else {
            cart.add(new CartItem(dto, 1));
        }

        session.setAttribute(CART_ATTR, cart);
        return ResponseEntity.ok("Item zum Warenkorb hinzugefügt!");
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(HttpSession session) {
        List<CartItem> cart = (List<CartItem>) session.getAttribute(CART_ATTR);
        return ResponseEntity.ok(cart != null ? cart : List.of());
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFromCart(@PathVariable Long id, HttpSession session) {
        @SuppressWarnings("unchecked")
        List<CartItem> cart = (List<CartItem>) session.getAttribute(CART_ATTR);
        if (cart != null) {
            cart.removeIf(ci -> ci.getItem().getId().equals(id));
            session.setAttribute(CART_ATTR, cart);
        }
        return ResponseEntity.ok().build();
    }

}
