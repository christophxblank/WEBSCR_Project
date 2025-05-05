package technikum.web_shop.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import technikum.web_shop.dto.RegisterRequest;
import technikum.web_shop.dto.LoginRequest;
import technikum.web_shop.model.User;
import technikum.web_shop.model.Address;
import technikum.web_shop.model.PaymentMethod;
import technikum.web_shop.repositories.UserRepository;
import technikum.web_shop.repositories.AddressRepository;
import technikum.web_shop.repositories.PaymentMethodRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       AddressRepository addressRepository,
                       PaymentMethodRepository paymentMethodRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Validiert Registrierungsdaten.
     */
    public List<String> validateRegistration(RegisterRequest req) {
        List<String> errors = new ArrayList<>();
        if (req.getTitle() == null || req.getTitle().isBlank())
            errors.add("Titel darf nicht leer sein.");
        if (req.getFirstname() == null || req.getFirstname().isBlank())
            errors.add("Vorname darf nicht leer sein.");
        if (req.getLastname() == null || req.getLastname().isBlank())
            errors.add("Nachname darf nicht leer sein.");
        if (req.getEmail() == null || !req.getEmail().matches("^.+@.+\\..+$"))
            errors.add("Ungültige E-Mail-Adresse.");
        if (req.getUsername() == null || req.getUsername().isBlank())
            errors.add("Benutzername darf nicht leer sein.");
        if (req.getPassword() == null || req.getPassword().length() < 8)
            errors.add("Passwort muss mindestens 8 Zeichen lang sein.");
        if (req.getPhone() == null || req.getPhone().isBlank())
            errors.add("Telefonnummer darf nicht leer sein.");
        if (req.getAdress_fk() == null)
            errors.add("Adresse muss angegeben werden.");
        if (req.getPayment_fk() == null)
            errors.add("Zahlungsmethode muss angegeben werden.");
        // Dubletten prüfen:
        if (userRepository.findByUsernameOrEmail(req.getUsername(), req.getUsername()).isPresent())
            errors.add("Benutzername bereits vergeben.");
        if (userRepository.findByUsernameOrEmail(req.getEmail(), req.getEmail()).isPresent())
            errors.add("E-Mail bereits registriert.");

        return errors;
    }

    /**
     * Legt einen neuen Nutzer an.
     */
    public void register(RegisterRequest req) {
        // Fremdschlüssel-Entitäten laden
        Address address = addressRepository.findById(req.getAdress_fk())
                .orElseThrow(() -> new IllegalArgumentException("Ungültige Address-ID."));
        PaymentMethod payment = paymentMethodRepository.findById(req.getPayment_fk())
                .orElseThrow(() -> new IllegalArgumentException("Ungültige PaymentMethod-ID."));

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstname());
        user.setLastName(req.getLastname());
        user.setTitle(req.getTitle());
        user.setRole("customer");
        user.setPhone(req.getPhone());
        user.setActive(true);
        user.setAddress(address);
        user.setPaymentMethod(payment);
        userRepository.save(user);
    }

    /**
     * Authentifiziert einen Nutzer und setzt Session/Cookie.
     */
    public boolean authenticate(LoginRequest req, HttpSession session, HttpServletResponse response) {
        Optional<User> userOpt = userRepository.findByUsernameOrEmail(req.getIdentifier(), req.getIdentifier());
        if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            return false;
        }
        User user = userOpt.get();
        session.setAttribute("userId", user.getId());
        session.setAttribute("userRole", user.getRole());
        if (req.isRememberMe()) {
            Cookie cookie = new Cookie("remember_me", session.getId());
            cookie.setMaxAge(30 * 24 * 3600);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        return true;
    }
}