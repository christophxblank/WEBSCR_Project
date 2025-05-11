

    // Session abfragen und Menü anpassen
    fetch('/api/auth/session')
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(session => {
            // Gäste-Links
            if (!session.authenticated) {
                ['nav-login', 'nav-register'].forEach(id => document.getElementById(id)?.classList.remove('d-none'));
                return;
            }
            // Eingeloggt
            ['nav-login', 'nav-register'].forEach(id => document.getElementById(id)?.classList.add('d-none'));
            document.getElementById('nav-logout')?.classList.remove('d-none');
            document.getElementById('nav-cart')?.classList.remove('d-none');

            if (session.role === 'customer') {
                document.getElementById('nav-account')?.classList.remove('d-none');
            }
            if (session.role === 'admin') {
                ['nav-admin-products','nav-admin-customers','nav-admin-vouchers']
                    .forEach(id => document.getElementById(id)?.classList.remove('d-none'));
            }

            // Logout-Handler
            document.getElementById('logoutLink')?.addEventListener('click', async e => {
                e.preventDefault();
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/index.html';
            });
        })
        .catch(err => console.error('Navbar-Session-Abfrage fehlgeschlagen', err));

