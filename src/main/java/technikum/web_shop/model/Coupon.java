package technikum.web_shop.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;

    private String name;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Column(name = "benefit_amount")
    private BigDecimal benefitAmount;

    public Coupon() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(LocalDate validUntil) {
        this.validUntil = validUntil;
    }

    public BigDecimal getBenefitAmount() {
        return benefitAmount;
    }

    public void setBenefitAmount(BigDecimal benefitAmount) {
        this.benefitAmount = benefitAmount;
    }
}
