package technikum.web_shop.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.service.ItemService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SessionController {

    private final ItemService itemService;

    public SessionController(ItemService itemService) {
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

    @PostMapping("/cart/add/{id}")
    public String addToCart(@PathVariable("id") Long id, HttpSession session) {
        // Warenkorb aus Session oder neu anlegen
        List<Map<String, Object>> cart =
                (List<Map<String, Object>>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }

        // komplettes DTO holen
        ItemDTO dto = itemService.findDtoById(id);
        // nur die benötigten Felder in eine Map packen
        Map<String, Object> entry = new HashMap<>();
        entry.put("id", dto.getId());
        entry.put("name", dto.getName());
        entry.put("price", dto.getPrice());
        entry.put("description", dto.getDescription());
        entry.put("image_url", dto.getImageUrl());

        cart.add(entry);
        session.setAttribute("cart", cart);
        return "Item zum Warenkorb hinzugefügt!";
    }

    @GetMapping("/cart")
    public List<Map<String, Object>> getCart(HttpSession session) {
        List<Map<String, Object>> cart =
                (List<Map<String, Object>>) session.getAttribute("cart");
        return cart != null ? cart : new ArrayList<>();
    }

}
