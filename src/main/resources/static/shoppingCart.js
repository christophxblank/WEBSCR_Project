// shoppingCart.js

let currentPaymentMethod = null;

// Coupon-HTML-Block (für spätere Einbindung in loadOrder)
const couponHtml = `
  <div class="mb-3">
    <label for="couponCode" class="form-label">Gutschein-Code</label>
    <input id="couponCode" placeholder="Gutschein-Code" class="form-control d-inline-block w-auto me-2" />
    <button id="applyCouponBtn" class="btn btn-secondary">Coupon prüfen</button>
  </div>
  <p>Rabatt: <span id="discount">0.00</span> €</p>
`;

document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart/session');    // Session initialisieren
    setupCart();
    document.getElementById("OrderButton")?.addEventListener("click", () => {
        viewOrder();
    });
});

async function checkAuth() {
    try {
        const res = await fetch('/api/auth/session', {
            credentials: 'include'
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error('Fehler beim Prüfen der Session:', e);
        return { authenticated: false, role: null, userId: null };
    }
}

function setupCart() {
    const cartBtn = document.getElementById('cart');
    if (!cartBtn) return;
    cartBtn.addEventListener('click', e => {
        e.preventDefault();
        loadCart();
    });
}

function loadCart() {
    fetch('/cart')
        .then(res => res.json())
        .then(cartItems => {
            let html = '';
            let sum = 0, itemSum = 0;
            if (cartItems.length === 0) {
                html = '<p>Dein Warenkorb ist leer.</p>';
            } else {
                cartItems.forEach(ci => {
                    html += `
                      <div class="cart-item">
                        <p>
                          <strong>${ci.item.name}</strong> - ${ci.item.price.toFixed(2)} €
                          Anzahl: ${ci.quantity}
                          <button class="btn btn-primary" onclick="addToCart(${ci.item.id})">+</button>
                          <button class="btn btn-danger" onclick="deleteFromCart(${ci.item.id})">x</button>
                        </p>
                      </div>`;
                    sum += ci.item.price * ci.quantity;
                    itemSum += ci.quantity;
                });
            }
            document.getElementById('cartContent').innerHTML = html;
            document.getElementById('cartSum').textContent = sum.toFixed(2);
            document.getElementById('cartItemSum').textContent = itemSum;
            openCartModal();
        })
        .catch(err => console.error('Fehler beim Laden des Warenkorbs:', err));
}

function addToCart(id) {
    fetch(`/cart/add/${id}`, { method: 'POST' })
        .then(res => res.ok ? loadCart() : console.error('Fehler beim Hinzufügen'))
        .catch(err => console.error('Fehler beim Hinzufügen zum Warenkorb:', err));
}

function deleteFromCart(id) {
    fetch(`/cart/delete/${id}`, { method: 'POST' })
        .then(res => res.ok ? loadCart() : console.error('Fehler beim Löschen'))
        .catch(err => console.error('Fehler beim Löschen aus dem Warenkorb:', err));
}

async function viewOrder() {
    // 1) Auth
    const { authenticated, userId } = await checkAuth();
    if (!authenticated) {
        alert('Bitte melde dich zuerst an, um eine Bestellung aufzugeben.');
        return;
    }

    // 2) Nutzerdetails & Bestellung laden
    await viewUserdetails(userId);
    await loadOrder();
    closeCartModal();
}

function viewUserdetails(userId) {
    document.getElementById('user-container').innerHTML = '';
    fetch(`/users/${userId}`, { credentials: 'include' })
        .then(res => res.json())
        .then(user => {
            const uc = document.getElementById('user-container');
            uc.innerHTML = `
              <div class="container col-4 ordercontainer">
                <h5>Name: ${user.first_name} ${user.last_name}</h5>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Lieferadresse:</strong><br>
                   ${user.address.street}<br>
                   ${user.address.plz} ${user.address.city}<br>
                   ${user.address.country}</p>
                <p><strong>Zahlungsart:</strong> ${user.payment_method.name}</p>
              </div>`;
            currentPaymentMethod = user.payment_method.name;
        })
        .catch(err => console.error('Fehler beim Laden der Nutzerdetails:', err));
}

function loadOrder() {
    fetch('/cart')
        .then(res => res.json())
        .then(cartItems => {
            let html = '';
            let sum = 0;
            if (cartItems.length === 0) {
                html = '<p>Deine Bestellung ist leer.</p>';
            } else {
                html += `<div class="container col-8 ordercontainer">
                           <h1>Ihre Bestellung:</h1>
                           ${couponHtml}`;
                cartItems.forEach(ci => {
                    html += `
                      <table class="table table-striped centered-table">
                        <thead>
                          <tr><th>Name</th><th>Preis</th><th>Anzahl</th><th>Summe</th></tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${ci.item.name}</td>
                            <td>${ci.item.price.toFixed(2)} €</td>
                            <td>${ci.quantity}</td>
                            <td>${(ci.item.price * ci.quantity).toFixed(2)} €</td>
                          </tr>
                        </tbody>
                      </table>`;
                    sum += ci.item.price * ci.quantity;
                });
                html += `<h5><strong>Gesamt: <span id="orderTotal">${sum.toFixed(2)}</span> €</strong></h5>
                         <button id="ConfirmOrder" class="btn btn-primary">Jetzt bestellen</button>
                         </div><br><br>`;
            }
            const main = document.getElementById('main-container');
            main.innerHTML = html;

            // Coupon prüfen
            document.getElementById('applyCouponBtn')
                .addEventListener('click', applyCoupon);

            // Bestellung abschließen
            document.getElementById('ConfirmOrder')
                .addEventListener('click', () => {
                    alert("Vielen Dank für Ihre Bestellung, Sie werden zum externen Zahlungssystem weitergeleitet.");
                    openPaymentSite();
                    fetch("/orders", {
                        method: "POST",
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cartItems)
                    })
                        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
                        .then(order => console.log(order))
                        .catch(err => console.error('Fehler beim Speichern der Bestellung:', err));
                    document.getElementById('cartItemSum').textContent = "0";
                    document.getElementById('useroverview').click();
                });
        })
        .catch(err => console.error('Fehler beim Laden der Bestellung:', err));
}

function openPaymentSite() {
    let url;
    switch (currentPaymentMethod) {
        case "PayPal":
            url = "https://www.paypal.com/de/signin";
            break;
        case "Kreditkarte":
            url = "https://customerportal.cardcomplete.com/";
            break;
        default:
            alert(`Zahlungsart „${currentPaymentMethod}“ wird noch nicht unterstützt.`);
            return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
}

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}

async function applyCoupon() {
    const code = document.getElementById('couponCode').value.trim();
    if (!code) {
        alert('Bitte gib einen Gutscheincode ein.');
        return;
    }
    const res = await fetch('/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ code })
    });
    const json = await res.json();
    if (!res.ok) {
        alert(json.error);
        return;
    }
    // Rabatt anzeigen
    const amount = parseFloat(json.benefitAmount ?? json.benefit_amount);
    document.getElementById('discount').textContent = amount.toFixed(2);
    // Gesamt neu berechnen
    const totalEl = document.getElementById('orderTotal');
    const total = parseFloat(totalEl.textContent);
    totalEl.textContent = Math.max(0, total - amount).toFixed(2);
}
