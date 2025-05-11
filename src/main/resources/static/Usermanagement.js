
document.addEventListener("DOMContentLoaded", function() {
    LoadLoginForm();
    LoadRegisterForm();
    SubmitRegisterForm();
    SubmitLoginForm();
})


function LoadLoginForm() {      //Loads the login form by click from navbar

document.getElementById('login_link').addEventListener("click", () => {
    document.getElementById('main-container').innerHTML = `<div class="container">
            <div class="row justify-content-center mt-5">
              <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div class="card shadow-sm p-4">
                  <h3 class="text-center mb-4">Login</h3>
                  <form id="loginForm" class="" " novalidate>
        <div class="mb-3">
            <label for="identifier" class="form-label">Benutzername oder E-Mail</label>
            <input type="text" id="identifier" name="identifier" class="form-control" required>
            <div class="invalid-feedback">Wert erforderlich.</div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Passwort</label>
            <input type="password" id="password" name="password" class="form-control" required>
            <div class="invalid-feedback">Passwort erforderlich.</div>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="rememberMe">
            <label for="rememberMe" class="form-check-label">Login merken</label>
        </div>
        <button type="submit" class="btn btn-primary">Einloggen</button>
    </form>
     </div>
       </div>
      </div>
     </div>`;

});
}

function LoadRegisterForm() {    //Loads the register form by click from navbar

    document.getElementById('register_link').addEventListener("click", () => {
        document.getElementById('main-container').innerHTML = ` <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <div class="card shadow-sm p-4">
              <h3 class="text-center mb-4">Neues Konto anlegen</h3>
              <form id="registerForm" novalidate>
                <div class="mb-3">
                  <label for="title" class="form-label">Titel</label>
                  <select id="title" name="title" class="form-select" required>
                    <option value="">Bitte wählen</option>
                    <option>Herr</option>
                    <option>Frau</option>
                  </select>
                  <div class="invalid-feedback">Bitte Titel auswählen.</div>
                </div>
                <div class="mb-3">
                  <label for="firstname" class="form-label">Vorname</label>
                  <input type="text" id="firstname" name="firstname"
                         class="form-control" required>
                  <div class="invalid-feedback">Vorname erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="lastname" class="form-label">Nachname</label>
                  <input type="text" id="lastname" name="lastname"
                         class="form-control" required>
                  <div class="invalid-feedback">Nachname erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">E-Mail</label>
                  <input type="email" id="email" name="email"
                         class="form-control" required>
                  <div class="invalid-feedback">E-Mail erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Benutzername</label>
                  <input type="text" id="username" name="username"
                         class="form-control" required>
                  <div class="invalid-feedback">Benutzername erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Telefon</label>
                  <input type="tel" id="phone" name="phone"
                         class="form-control">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Passwort</label>
                  <input type="password" id="password" name="password"
                         class="form-control" minlength="8" required>
                  <div class="invalid-feedback">
                    Passwort muss mind. 8 Zeichen lang sein.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password_confirm" class="form-label">
                    Passwort wiederholen
                  </label>
                  <input type="password" id="password_confirm"
                         name="password_confirm" class="form-control" required>
                  <div class="invalid-feedback">
                    Passwörter stimmen nicht überein.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="adress_fk" class="form-label">Adress-ID</label>
                  <input type="number" id="adress_fk" name="adress_fk"
                         class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="payment_fk" class="form-label">
                    Zahlungs-ID
                  </label>
                  <input type="number" id="payment_fk" name="payment_fk"
                         class="form-control" required>
                </div>
                <button type="submit"
                        class="btn btn-primary w-100">
                  Registrieren
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>`;
    });
}

function SubmitRegisterForm() {

        const form = document.getElementById('registerForm');

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
                title: form.title.value,
                firstname: form.firstname.value,
                lastname: form.lastname.value,
                email: form.email.value,
                username: form.username.value,
                phone: form.phone.value,
                password: form.password.value,
                adress_fk: Number(form.adress_fk.value),
                payment_fk: Number(form.payment_fk.value)
            };

            let resp;
            try {
                resp = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
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
}


function SubmitLoginForm() {
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
}









