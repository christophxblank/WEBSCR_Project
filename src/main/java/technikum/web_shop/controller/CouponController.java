package technikum.web_shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import technikum.web_shop.model.Coupon;
import technikum.web_shop.service.CouponService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/coupons")
public class CouponController {
    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    // Admin: neuen Coupon anlegen
    @PostMapping
    public ResponseEntity<Coupon> create(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        BigDecimal amount = new BigDecimal(body.get("benefitAmount"));
        LocalDate validUntil = LocalDate.parse(body.get("validUntil"));
        Coupon c = couponService.createCoupon(name, amount, validUntil);
        return ResponseEntity.ok(c);
    }

    // Admin: alle Coupons auflisten
    @GetMapping
    public ResponseEntity<List<Coupon>> list() {
        return ResponseEntity.ok(couponService.listAllCoupons());
    }

    // Kunde: Coupon prüfen (Einlösung im Checkout)
    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody Map<String, String> body) {
        try {
            Coupon c = couponService.validateCoupon(body.get("code"));
            return ResponseEntity.ok(c);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}