package technikum.web_shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.model.User;
import technikum.web_shop.service.UserService;
import technikum.web_shop.repositories.UserRepository;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchUser(
            @PathVariable Integer id,
            @RequestBody Map<String, Object> updates
    ) {
        // Stammdaten-Update (kein newPassword)
        if (updates.containsKey("oldPassword") && !updates.containsKey("newPassword")) {
            String oldPwd = (String) updates.get("oldPassword");
            try {
                userService.updateUserDetails(id, oldPwd, updates);
                return ResponseEntity.ok().build();
            } catch (IllegalArgumentException e) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of("error", e.getMessage()));
            }
        }

        // Passwort-Änderung (oldPassword + newPassword)
        if (updates.containsKey("oldPassword") && updates.containsKey("newPassword")) {
            String oldPwd = (String) updates.get("oldPassword");
            String newPwd = (String) updates.get("newPassword");
            try {
                userService.changePassword(id, oldPwd, newPwd);
                return ResponseEntity.ok().build();
            } catch (IllegalArgumentException e) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of("error", e.getMessage()));
            }
        }

        // Ungültige Payload
        return ResponseEntity
                .badRequest()
                .body(Map.of("error", "Ungültiges Update-Objekt"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/admin/{id}")
    public ResponseEntity<User> toggleActive(@PathVariable Integer id) {
        User updated = userService.toggleUserActive(id);
        return ResponseEntity.ok(updated);
    }




}
