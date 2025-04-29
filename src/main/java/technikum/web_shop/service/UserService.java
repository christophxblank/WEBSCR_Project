package technikum.web_shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import technikum.web_shop.dto.RegisterRequest;
import technikum.web_shop.dto.LoginRequest;
import technikum.web_shop.entity.User;
import technikum.web_shop.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Validiert Registrierungsdaten.
     * @param req DTO mit Registrierungsfeldern
     * @return Liste von Fehlermeldungen, leer bei Erfolg
     */
    public List<String> validateRegistration(RegisterRequest req) {
        List<String> errors = new ArrayList<>();
        // Pflichtfelder prüfen
        if (req.getUsername() == null || req.getUsername().isBlank()) {
            errors.add("Benutzername darf nicht leer sein.");
        }
        if (req.getEmail() == null || !req.getEmail().matches("^.+@.+\..+$")) {
            errors.add("Ungültige E-Mail-Adresse.");
        }
        if (req.getPassword() == null || req.getPassword().length() < 8) {
            errors.add("Passwort muss mindestens 8 Zeichen lang sein.");
        }
        // Dubletten prüfen
        Optional<User> byUsername = userRepository.findByUsernameOrEmail(req.getUsername(), req.getUsername());
        if (byUsername.isPresent()) {
            errors.add("Benutzername bereits vergeben.");
        }
        Optional<User> byEmail = userRepository.findByUsernameOrEmail(req.getEmail(), req.getEmail());
        if (byEmail.isPresent()) {
            errors.add("E-Mail bereits registriert.");
        }
        return errors;
    }

    /**
     * Legt einen neuen Nutzer an.
     * @param req DTO mit Registrierungsfeldern
     */
    public void register(RegisterRequest req) {
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setFirstname(req.getFirstname());
        user.setLastname(req.getLastname());
        user.setTitle(req.getTitle());
        user.setPhone(req.getPhone());
        user.setRole("customer");
        user.setAdress_fk(req.getAdress_fk());
        user.setPayment_fk(req.getPayment_fk());
        user.setActive(true);
        userRepository.save(user);
    }

    /**
     * Authentifiziert einen Nutzer und setzt Session/Cookie.
     * @param req DTO mit Login-Daten
     * @param session HTTP-Session für Login-Status
     * @param response HTTP-Response für Cookies
     * @return true, falls erfolgreich
     */
    public boolean authenticate(LoginRequest req, HttpSession session, HttpServletResponse response) {
        Optional<User> optUser = userRepository.findByUsernameOrEmail(req.getIdentifier(), req.getIdentifier());
        if (optUser.isEmpty()) {
            return false;
        }
        User user = optUser.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return false;
        }
        // Session setzen
        session.setAttribute("userId", user.getId());
        session.setAttribute("userRole", user.getRole());
        // Remember-me Cookie
        if (req.isRememberMe()) {
            Cookie cookie = new Cookie("remember_me", session.getId());
            cookie.setMaxAge(30 * 24 * 3600); // 30 Tage
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        return true;
    }
}