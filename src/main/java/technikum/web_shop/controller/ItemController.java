package technikum.web_shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.model.Category;
import technikum.web_shop.model.Item;
import technikum.web_shop.repositories.ItemRepository;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.service.ItemService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable long id) {
        return itemRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable int id, @RequestBody Item item) {
        item.setId(id);
        return itemRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable long id) {
        itemRepository.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Item patchItem(@PathVariable long id, @RequestBody Map<String, Object> updates) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item == null) return null;

        updates.forEach((key, value) -> {
            switch (key) {
                case "name" -> item.setName((String) value);
                case "price" -> item.setPrice((BigDecimal) value);
                case "stock" -> item.setStock((Integer) value);
                case "description" -> item.setDescription((String) value);
                case "imageUrl" -> item.setImageUrl((String) value);
                case "category" -> {
                    Map<String, Object> catMap = (Map<String, Object>) value;
                    if (catMap.containsKey("id")) {
                        Category category = new Category();
                        category.setId((Integer) catMap.get("id"));
                        item.setCategory(category);
                    }
                }
            }
        });

        return itemRepository.save(item);
    }

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return itemService.getAllCategories();
    }

    @GetMapping("/items")
    public List<ItemDTO> getItems(@RequestParam Long categoryId) {
        return itemService.getItemsByCategory(categoryId);
    }
}
