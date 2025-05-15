package technikum.web_shop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import technikum.web_shop.model.Category;
import technikum.web_shop.model.Item;
import technikum.web_shop.repositories.ItemRepository;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.service.ItemService;
import technikum.web_shop.repositories.CategoryRepository;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;
    private final ItemService itemService;
    @Autowired
    private CategoryRepository categoryRepository;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<ItemDTO> getItems(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return itemService.getItemsByCategory(categoryId);
        }
        return itemService.getAllItems();  // neu: alle Items als DTO
    }

    @GetMapping("/{id}")
    public Item getItemById(@PathVariable long id) {
        return itemRepository.findById(id).orElse(null);
    }


    @PostMapping(value = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Item createItem(
            @RequestParam("name")        String name,
            @RequestParam("description") String description,
            @RequestParam("price")       BigDecimal price,
            @RequestParam("categoryId")  Long categoryId,
            @RequestParam("image") MultipartFile imageFile
    ) throws Exception {
        //Bild speichern in src/main/resources/static/images
        Path imagesDir = Paths.get("src/main/resources/static/images");
        if (!Files.exists(imagesDir)) {
            Files.createDirectories(imagesDir);
        }
        String original = Paths.get(imageFile.getOriginalFilename()).getFileName().toString();
        String filename = UUID.randomUUID() + "_" + original;
        Path target = imagesDir.resolve(filename);
        Files.copy(imageFile.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);


        Item item = new Item();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setImageUrl("/images/" + filename);

        Category cat = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Ungültige Kategorie"));
        item.setCategory(cat);


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
                case "price" -> {BigDecimal bd;
                    if (value instanceof Number num) {
                        bd = BigDecimal.valueOf(num.doubleValue());
                    } else
                    {bd = new BigDecimal(value.toString());}
                    item.setPrice(bd); }

                case "stock" -> {int stock;
                    if (value instanceof Number num) {
                        stock = num.intValue();}
                    else {
                        stock = Integer.parseInt(value.toString()); }
                    item.setStock(stock);
                }

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

    @GetMapping("/search")
    public List<ItemDTO> search(@RequestParam("q") String query) {
        return itemService.searchItems(query);
    }

}
