package technikum.web_shop.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class SessionController {

    @GetMapping("/session")
    public String session(HttpSession session) {
        session.setAttribute("username", "admin");

    return session.getId();}


    @PostMapping("/cart/add")
    public String addToCart(@RequestBody Map<String, Object> item, HttpSession session) {
        List<Map<String, Object>> cart = (List<Map<String, Object>>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }
        cart.add(item);
        session.setAttribute("cart", cart);

        return "Item zum Warenkorb hinzugefügt!";
    }

    @GetMapping("/cart")
    public List<Map<String, Object>> getCart(HttpSession session) {
        List<Map<String, Object>> cart = (List<Map<String, Object>>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
        }
        return cart;
    }




}
