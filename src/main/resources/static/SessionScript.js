// Dynamische Navbar-Anpassung basierend auf Session-Status

document.addEventListener('DOMContentLoaded', async () => {
    // Standard: nicht authentifiziert
    let session = { authenticated: false, role: null };
    try {
        const resp = await fetch('/api/auth/session');
        if (resp.ok) {
            session = await resp.json();
        }
    } catch (err) {
        console.error('Session-Abfrage fehlgeschlagen, setze als Gast', err);
    }

    // Navigationselemente referenzieren
    const loginLi      = document.getElementById('login_link')?.closest('li');
    const registerLi   = document.getElementById('register_link')?.closest('li');
    const logoutLi     = document.getElementById('nav-logout');
    const accountLi    = document.getElementById('useroverview');
    const adminProducts  = document.getElementById('nav-admin-products');
    const adminCustomers = document.getElementById('nav-admin-customers');
    const adminVouchers  = document.getElementById('nav-admin-vouchers');

    if (!session.authenticated) {
        // Gast: Login/Register zeigen, Logout/Warenkorb/Konto/Admin ausblenden
        loginLi?.classList.remove('d-none');
        registerLi?.classList.remove('d-none');
        logoutLi?.classList.add('d-none');

        accountLi?.classList.add('d-none');
        adminProducts?.classList.add('d-none');
        adminCustomers?.classList.add('d-none');
        adminVouchers?.classList.add('d-none');
        const couponNav = document.getElementById('nav-admin-vouchers');
        if (couponNav) {
            couponNav.querySelector('a')
                .addEventListener('click', () => viewCoupons('admin-content'));
        }
    } else {
        // Eingeloggt: Login/Register ausblenden, Logout zeigen
        loginLi?.classList.add('d-none');
        registerLi?.classList.add('d-none');
        logoutLi?.classList.remove('d-none');


        // Konto oder Admin-Links je nach Rolle
        if (session.role === 'customer') {
            accountLi?.classList.remove('d-none');
            adminProducts?.classList.add('d-none');
            adminCustomers?.classList.add('d-none');
            adminVouchers?.classList.add('d-none');
        } else if (session.role === 'admin') {

            adminProducts?.classList.remove('d-none');
            adminCustomers?.classList.remove('d-none');
            adminVouchers?.classList.remove('d-none');
        }

    }

    const logoutLink = document.getElementById('logoutLink');  //Logout Link abfragen
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            logoutUser();
        });
    }


    });

function logoutUser() {
    // HTTP-Session invalidieren
    fetch('/api/auth/logout', { method: 'POST' })
        .then(() => {
            window.location.reload();
        })
        .catch(err => {
            console.error('Logout fehlgeschlagen', err);
        });
}