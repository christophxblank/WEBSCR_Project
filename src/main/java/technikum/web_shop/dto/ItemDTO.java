package technikum.web_shop.dto;

import java.math.BigDecimal;

public class ItemDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private BigDecimal price;
    private Double rating;
    private String description;

    public ItemDTO(Long id, String name, String imageUrl, BigDecimal price, Double rating, String description) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Double getRating() {
        return rating;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

  public String getDescription() {
        return description;
    }
}