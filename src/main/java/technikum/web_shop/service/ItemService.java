package technikum.web_shop.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import technikum.web_shop.dto.ItemDTO;
import technikum.web_shop.model.Category;
import technikum.web_shop.repositories.CategoryRepository;
import technikum.web_shop.repositories.ItemRepository;

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
                        i.getRating()
                ))
                .collect(Collectors.toList());
    }
}
