document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;  // Abbruch, wenn wir nicht auf register.html sind

    form.addEventListener('submit', async e => {
        e.preventDefault();
        // Reset Validation
        form.classList.remove('was-validated');
        form.password_confirm.setCustomValidity('');

        // HTML5-Validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        // Passwort-Abgleich
        if (form.password.value !== form.password_confirm.value) {
            form.password_confirm.setCustomValidity('Passwörter stimmen nicht überein');
            form.classList.add('was-validated');
            return;
        }

        // Daten sammeln
        const data = {
            title:        form.title.value,
            firstname:    form.firstname.value,
            lastname:     form.lastname.value,
            email:        form.email.value,
            username:     form.username.value,
            phone:        form.phone.value,
            password:     form.password.value,
            adress_fk:    Number(form.adress_fk.value),
            payment_fk:   Number(form.payment_fk.value)
        };

        let resp;
        try {
            resp = await fetch('/api/auth/register', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(data)
            });
        } catch {
            alert('Server nicht erreichbar. Bitte später erneut versuchen.');
            return;
        }

        let json;
        try {
            json = await resp.json();
        } catch {
            json = {};
        }

        if (!resp.ok) {
            const errs = Array.isArray(json.errors)
                ? json.errors
                : [json.message || 'Unbekannter Fehler'];
            alert(errs.join('\n'));
            return;
        }

        if (json.success) {
            window.location.href = 'login.html';
        } else {
            const errs = Array.isArray(json.errors)
                ? json.errors
                : ['Registrierung fehlgeschlagen.'];
            alert(errs.join('\n'));
        }
    });
});
