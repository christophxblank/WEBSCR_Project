package technikum.web_shop.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

    @GetMapping("/session")
    public String session(HttpSession session) {
        session.setAttribute("username", "admin");

    }



}
