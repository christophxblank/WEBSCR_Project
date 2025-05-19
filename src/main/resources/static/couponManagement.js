document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('orders-container').innerHTML = '';
    // Klick auf Coupon-Nav-Link bindet das Modul an den Admin-Content
    const couponNav = document.getElementById('nav-admin-vouchers');
    if (couponNav) {
        couponNav.querySelector('a')
            .addEventListener('click', () => {
                document.getElementById('orders-container').innerHTML = '';
                document.getElementById('user-container').innerHTML = '';
                document.getElementById('main-container').innerHTML = '';
                viewCoupons('admin-content')

            });
    }
});

// Lade und rendere das Coupon-Management UI
async function viewCoupons(containerId) {
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.innerHTML = '';
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container mit ID '${containerId}' nicht gefunden.`);
        return;
    }
    container.innerHTML = `
      <div class="mb-3">
        <input id="newName" placeholder="Name" class="form-control d-inline-block w-auto me-2" />
        <input id="newAmount" type="number" step="0.01" placeholder="Betrag" class="form-control d-inline-block w-auto me-2" />
        <input id="newValidUntil" type="date" class="form-control d-inline-block w-auto me-2" />
        <button id="createCouponBtn" class="btn btn-primary">Coupon erstellen</button>
      </div>
      <table class="table table-striped">
        <thead><tr><th>Code</th><th>Name</th><th>Betrag</th><th>Gültig bis</th></tr></thead>
        <tbody id="couponTableBody"></tbody>
      </table>`;

    document.getElementById('createCouponBtn').addEventListener('click', async () => {
        const name = document.getElementById('newName').value;
        const benefitAmount = document.getElementById('newAmount').value;
        const validUntil = document.getElementById('newValidUntil').value;
        await fetch('/coupons', {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ name, benefitAmount, validUntil })
        });
        loadCoupons();
    });

    await loadCoupons();
}

// Lädt alle Coupons in die Tabelle
async function loadCoupons() {
    const res = await fetch('/coupons');
    const list = await res.json();
    const tbody = document.getElementById('couponTableBody');
    tbody.innerHTML = list.map(c => `
      <tr>
        <td>${c.code}</td>
        <td>${c.name}</td>
        <td>${parseFloat(c.benefit_amount).toFixed(2)} €</td>
        <td>${c.valid_until}</td>
      </tr>`) .join('');
}