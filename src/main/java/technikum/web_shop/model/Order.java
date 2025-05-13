
package technikum.web_shop.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // Datum der Bestellung
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    // Gesamtsumme über alle OrderItems
    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    // Alle Positionen dieser Bestellung
    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems = new ArrayList<>();

    public Order() { }
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
    public LocalDate getOrderDate() {return orderDate;}
    public void setOrderDate(LocalDate orderDate) {this.orderDate = orderDate;}
    public BigDecimal getTotalPrice() {return totalPrice;}
    public void setTotalPrice(BigDecimal totalPrice) {this.totalPrice = totalPrice;}
    public List<OrderItem> getOrderItems() {return orderItems;}
    public void setOrderItems(List<OrderItem> orderItems) {this.orderItems = orderItems;}

    // Hilfsmethode zum Hinzufügen einer OrderItem
    public void addOrderItem(OrderItem item) {
        orderItems.add(item);
        item.setOrder(this);}

    // Hilfsmethode zum Entfernen einer OrderItem
    public void removeOrderItem(OrderItem item) {
        orderItems.remove(item);
        item.setOrder(null);}
}
