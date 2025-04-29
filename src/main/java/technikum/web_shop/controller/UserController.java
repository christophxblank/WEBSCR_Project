package technikum.web_shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.model.Address;
import technikum.web_shop.model.PaymentMethod;
import technikum.web_shop.model.User;
import technikum.web_shop.repositories.UserRepository;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById((long) id).orElse(null);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PatchMapping("/{id}")
    public User patchUser(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        User user = userRepository.findById((long) id).orElse(null);
        if (user == null) return null;

        updates.forEach((key, value) -> {
            switch (key) {
                case "username" -> user.setUsername((String) value);
                case "password" -> user.setPassword((String) value);
                case "email" -> user.setEmail((String) value);
                case "phone" -> user.setPhone((String) value);

                case "address" -> {
                    Map<String, Object> addrMap = (Map<String, Object>) value;
                    Address address = new Address();
                    if (addrMap.containsKey("id")) {
                        address.setId((Integer) addrMap.get("id"));
                        user.setAddress(address);
                    }
                }

                case "paymentMethod" -> {
                    Map<String, Object> payMap = (Map<String, Object>) value;
                    PaymentMethod paymentMethod = new PaymentMethod();
                    if (payMap.containsKey("id")) {
                        paymentMethod.setId((Integer) payMap.get("id"));
                        user.setPaymentMethod(paymentMethod);
                    }
                }

                default -> throw new IllegalArgumentException("Ungültiger Schlüssel: " + key);
            }
        });

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById((long) id);
    }


}
