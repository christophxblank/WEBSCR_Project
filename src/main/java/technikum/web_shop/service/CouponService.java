package technikum.web_shop.service;

import org.springframework.stereotype.Service;
import technikum.web_shop.model.Coupon;
import technikum.web_shop.repositories.CouponRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class CouponService {
    private final CouponRepository couponRepo;
    private final Random rnd = new Random();

    public CouponService(CouponRepository couponRepo) {
        this.couponRepo = couponRepo;
    }

    /**
     * Erstellt einen neuen Coupon mit zufälligem Code (UUID-Fragment) und setzt Name, Betrag und Gültigkeit.
     */
    public Coupon createCoupon(String name, BigDecimal benefitAmount, LocalDate validUntil) {
        Coupon c = new Coupon();
        c.setCode(generateCode());
        c.setName(name);
        c.setBenefitAmount(benefitAmount);
        c.setValidUntil(validUntil);
        return couponRepo.save(c);
    }

    /**
     * Listet alle Coupons.
     */
    public List<Coupon> listAllCoupons() {
        return couponRepo.findAll();
    }

    /**
     * Prüft, ob der Coupon existiert und noch gültig ist (Datum nicht überschritten).
     * Gibt den Coupon zurück, oder wirft IllegalArgumentException.
     */
    public Coupon validateCoupon(String code) {
        Coupon c = couponRepo.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("Coupon nicht gefunden: " + code));
        if (c.getValidUntil().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Coupon abgelaufen: " + code);
        }
        return c;
    }

    /**
     * Generiert einen 8-stelligen alphanumerischen Code.
     */
    private String generateCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb;
        do {
            sb = new StringBuilder(8);
            for (int i = 0; i < 8; i++) {
                sb.append(chars.charAt(rnd.nextInt(chars.length())));
            }
        } while (couponRepo.findByCode(sb.toString()).isPresent());
        return sb.toString();
    }
}