package technikum.web_shop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import technikum.web_shop.dto.RegisterRequest;
import technikum.web_shop.dto.LoginRequest;
import technikum.web_shop.dto.AuthResponse;
import technikum.web_shop.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Registrierung eines neuen Nutzers.
     * @param req DTO mit Registrierungsdaten
     * @return 200 OK bei Erfolg, 400 Bad Request mit Fehlerliste sonst
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req) {
        List<String> errors = userService.validateRegistration(req);
        if (!errors.isEmpty()) {
            // Validierungsfehler zurückgeben
            return ResponseEntity.badRequest()
                    .body(new AuthResponse(false, errors));
        }
        // Nutzer anlegen
        userService.register(req);
        return ResponseEntity.ok(new AuthResponse(true, null));
    }

    /**
     * Login eines existierenden Nutzers.
     * @param req DTO mit Login-Daten (Identifier, Passwort, rememberMe)
     * @param session HTTP-Session zur Speicherung des Login-Status
     * @param response HTTP-Response, um ggf. ein Cookie zu setzen
     * @return 200 OK bei Erfolg, 401 Unauthorized bei ungültigen Daten
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req,
                                              HttpSession session,
                                              HttpServletResponse response) {
        boolean success = userService.authenticate(req, session, response);
        if (success) {
            // Login erfolgreich
            return ResponseEntity.ok(new AuthResponse(true, null));
        } else {
            // Ungültige Zugangsdaten
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, List.of("Ungültige Zugangsdaten")));
        }
    }
}