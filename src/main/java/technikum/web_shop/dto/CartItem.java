package technikum.web_shop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CartItem {

        private ItemDTO item;
        private int quantity;

    public CartItem(ItemDTO item, int quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    @JsonProperty("item")
    public ItemDTO getItem() { return item; }

    @JsonProperty("quantity")
    public int getQuantity() { return quantity; }



    public void setItem(ItemDTO item) {
        this.item = item;
    }


    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
