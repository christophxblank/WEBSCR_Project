package technikum.web_shop.dto;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String title;
    private String phone;
    private Integer adress_fk;
    private Integer payment_fk;

    // Getter und Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getAdress_fk() { return adress_fk; }
    public void setAdress_fk(Integer adress_fk) { this.adress_fk = adress_fk; }

    public Integer getPayment_fk() { return payment_fk; }
    public void setPayment_fk(Integer payment_fk) { this.payment_fk = payment_fk; }
}