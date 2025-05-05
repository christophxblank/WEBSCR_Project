// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (!form) return;  // Abbruch, wenn wir nicht auf login.html sind

    form.addEventListener('submit', async e => {
        e.preventDefault();
        // Reset Validation
        form.classList.remove('was-validated');

        // HTML5-Validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const data = {
            identifier: form.identifier.value,
            password:   form.password.value,
            rememberMe: form.rememberMe.checked
        };

        let resp;
        try {
            resp = await fetch('/api/auth/login', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(data)
            });
        } catch {
            alert('Server nicht erreichbar. Bitte später erneut versuchen.');
            return;
        }

        if (resp.ok) {
            window.location.href = 'index.html';
        } else {
            const json = await resp.json().catch(() => ({}));
            const errs = Array.isArray(json.errors)
                ? json.errors
                : [json.message || 'Ungültige Zugangsdaten'];
            alert(errs.join('\n'));
        }
    });
});
