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
        return userRepository.findById(id).orElse(null);
    }


    @PatchMapping("/{id}")
    public User patchUser(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return null;

        updates.forEach((key, value) -> {
            switch (key) {
                case "username" -> user.setUsername((String) value);
                case "password" -> user.setPassword((String) value);
                case "email" -> user.setEmail((String) value);
                case "phone" -> user.setPhone((String) value);
                case "first_name"  -> user.setFirstName((String) value);
                case "last_name"   -> user.setLastName((String) value);

                case "address" -> {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> addrMap = (Map<String, Object>) value;
                    Address addr = user.getAddress();
                    if (addr == null) {
                        addr = new Address();
                        user.setAddress(addr);
                    }
                    if (addrMap.containsKey("street"))  addr.setStreet((String) addrMap.get("street"));
                    if (addrMap.containsKey("plz"))     addr.setPlz((String) addrMap.get("plz"));
                    if (addrMap.containsKey("city"))    addr.setCity((String) addrMap.get("city"));
                    if (addrMap.containsKey("country")) addr.setCountry((String) addrMap.get("country"));
                }

                case "paymentMethod" -> {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> payMap = (Map<String, Object>) value;
                    if (payMap.containsKey("id")) {
                        PaymentMethod pm = new PaymentMethod();
                        pm.setId((Integer) payMap.get("id"));
                        user.setPaymentMethod(pm);
                    }
                }


                default -> throw new IllegalArgumentException("Ungültiger Schlüssel: " + key);
            }
        });

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById( id);
    }


}
