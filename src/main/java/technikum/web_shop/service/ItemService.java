package technikum.web_shop.service;

import org.springframework.stereotype.Service;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.model.Category;
import technikum.web_shop.model.Item;
import technikum.web_shop.repositories.CategoryRepository;
import technikum.web_shop.repositories.ItemRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {
    private final ItemRepository itemRepo;
    private final CategoryRepository categoryRepo;

    public ItemService(ItemRepository itemRepo, CategoryRepository categoryRepo) {
        this.itemRepo = itemRepo;
        this.categoryRepo = categoryRepo;
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public List<ItemDTO> getItemsByCategory(Long categoryId) {
        Category cat = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Ungültige Kategorie-ID."));
        return itemRepo.findByCategory(cat).stream()
                .map(i -> new ItemDTO(
                        i.getId(),
                        i.getName(),
                        i.getImageUrl(),
                        i.getPrice(),
                        i.getRating(),
                        i.getDescription()   // falls dein DTO noch kein Description-Feld hatte
                ))
                .collect(Collectors.toList());
    }

    public ItemDTO findDtoById(Long id) {
        Item i = itemRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Artikel nicht gefunden: " + id));
        return new ItemDTO(
                i.getId(),
                i.getName(),
                i.getImageUrl(),
                i.getPrice(),
                i.getRating(),
                i.getDescription()
        );
    }
public List<ItemDTO> getAllItems() {
        return itemRepo.findAll().stream()
                .map(i -> new ItemDTO(
                        i.getId(),
                        i.getName(),
                        i.getImageUrl(),
                        i.getPrice(),
                        i.getRating(),
                        i.getDescription()
                ))
                .collect(Collectors.toList());
    }

    public List<ItemDTO> searchItems(String term) {
        return itemRepo.findByNameContainingIgnoreCase(term).stream()
                .map(i -> new ItemDTO(
                        i.getId(),
                        i.getName(),
                        i.getImageUrl(),
                        i.getPrice(),
                        i.getRating(),
                        i.getDescription()
                ))
                .collect(Collectors.toList());
    }


}
