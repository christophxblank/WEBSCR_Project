package technikum.web_shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity

public class Order {
    @Id
    private int id;
    private double total_price;
    private Date created_at;
    private String status;



}
