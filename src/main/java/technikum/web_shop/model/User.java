package technikum.web_shop.model;


import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;
    private String email;
    private String role;
    private String phone;
    private String firstname;
    private String lastname;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "adress_fk")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "payment_fk")
    private PaymentMethod paymentMethod;

public User() {}

    public User(String username, String password, String email, String role, String phone, String firstName, String lastName, boolean isActive, Address address, PaymentMethod paymentMethod) {

        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.firstname = firstName;
        this.lastname = lastName;
        this.active =active;
        this.address = address;
        this.paymentMethod = paymentMethod;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastName) {
        this.lastname = lastName;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }


}
