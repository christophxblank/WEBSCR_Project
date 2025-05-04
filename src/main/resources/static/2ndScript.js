document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resp = await fetch('/api/auth/session');
        if (!resp.ok) return;
        const session = await resp.json();
        // Gast
        if (!session.authenticated) {
            document.getElementById('nav-login').classList.remove('d-none');
            document.getElementById('nav-register').classList.remove('d-none');
        } else {
            // Eingeloggt
            ['nav-login','nav-register'].forEach(id => document.getElementById(id).classList.add('d-none'));
            document.getElementById('nav-logout').classList.remove('d-none');
            document.getElementById('nav-cart').classList.remove('d-none');

            if (session.role === 'customer') {
                document.getElementById('nav-account').classList.remove('d-none');
            }
            if (session.role === 'admin') {
                ['nav-admin-products','nav-admin-customers','nav-admin-vouchers']
                    .forEach(id => document.getElementById(id).classList.remove('d-none'));
            }

            // Logout verarbeiten
            document.getElementById('logoutLink').addEventListener('click', async e => {
                e.preventDefault();
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/index.html';
            });
        }
    } catch (err) {
        console.error('Navbar-Session-Abfrage fehlgeschlagen', err);
    }
});
