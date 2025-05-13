document.addEventListener('DOMContentLoaded', () => {
   document.getElementById('useroverview').addEventListener('click', () => {
        loadUser();
    });
});

const LOGIN_URL     = '/api/auth/login';
const REGISTER_URL  = '/api/auth/register';

/**
 * Zeigt oberhalb des Formulars eine Alert-Box mit Fehlermeldungen.
 */
function showFormError(form, messages) {
    clearFormErrors(form);
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.innerHTML = messages.map(m => `<div>${m}</div>`).join('');
    form.prepend(alert);
}

/** Entfernt alle Alert-Boxen und Invalid-Klassen aus dem Formular */
function clearFormErrors(form) {
    form.querySelectorAll('.alert-danger').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(f => f.classList.remove('is-invalid'));
}

/** Markiert ein Feld als invalid und zeigt Inline-Feedback */
function setFieldError(form, fieldName, message) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    field.classList.add('is-invalid');
    let fb = field.nextElementSibling;
    if (!fb || !fb.classList.contains('invalid-feedback')) {
        fb = document.createElement('div');
        fb.className = 'invalid-feedback';
        field.after(fb);
    }
    fb.textContent = message;
}

/** Baut und lädt das Login-Formular bei Klick */
function LoadLoginForm() {
    const link = document.getElementById('login_link');
    if (!link) return;
    link.addEventListener('click', () => {
        document.getElementById('main-container').innerHTML = `
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <div class="card shadow-sm p-4">
              <h3 class="text-center mb-4">Login</h3>
              <form id="loginForm" novalidate>
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
                  <input class="form-check-input" type="checkbox" id="rememberMe" name="rememberMe">
                  <label for="rememberMe" class="form-check-label">Login merken</label>
                </div>
                <button type="submit" class="btn btn-primary w-100">Einloggen</button>
              </form>
            </div>
          </div>
        </div>
      </div>`;
        submitLoginForm();
    });
}

/** Reagiert auf das Submit des Login-Formulars */
function submitLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors(form);
        form.classList.remove('was-validated');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        const data = {
            identifier: form.identifier.value.trim(),
            password:   form.password.value,
            rememberMe: form.rememberMe.checked
        };
        try {
            const resp = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (resp.ok) {
                // Nach erfolgreichem Login: Seite neu laden, Navbar-Update erfolgt in 2ndScript.js
                window.location.href = '/index.html';
            } else {
                const json = await resp.json().catch(() => ({}));
                showFormError(form, json.errors || ['Ungültige Zugangsdaten']);
            }
        } catch {
            showFormError(form, ['Server nicht erreichbar']);
        }
    });
}

/** Baut und lädt das Registrierungs-Formular bei Klick */
function LoadRegisterForm() {
    const link = document.getElementById('register_link');
    if (!link) return;
    link.addEventListener('click', () => {
        document.getElementById('main-container').innerHTML = `
      <div class="container">
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
                  <input type="text" id="firstname" name="firstname" class="form-control" required>
                  <div class="invalid-feedback">Vorname erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="lastname" class="form-label">Nachname</label>
                  <input type="text" id="lastname" name="lastname" class="form-control" required>
                  <div class="invalid-feedback">Nachname erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">E-Mail</label>
                  <input type="email" id="email" name="email" class="form-control" required>
                  <div class="invalid-feedback">E-Mail erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Benutzername</label>
                  <input type="text" id="username" name="username" class="form-control" required>
                  <div class="invalid-feedback">Benutzername erforderlich.</div>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label">Telefon</label>
                  <input type="tel" id="phone" name="phone" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Passwort</label>
                  <input type="password" id="password" name="password" class="form-control" minlength="8" required>
                  <div class="invalid-feedback">Passwort muss mind. 8 Zeichen lang sein.</div>
                </div>
                <div class="mb-3">
                  <label for="password_confirm" class="form-label">Passwort wiederholen</label>
                  <input type="password" id="password_confirm" name="password_confirm" class="form-control" required>
                  <div class="invalid-feedback">Passwörter stimmen nicht überein.</div>
                </div>
                <div class="mb-3">
                  <label for="adress_fk" class="form-label">Adress-ID</label>
                  <input type="number" id="adress_fk" name="adress_fk" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="payment_fk" class="form-label">Zahlungs-ID</label>
                  <input type="number" id="payment_fk" name="payment_fk" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Registrieren</button>
              </form>
            </div>
          </div>
        </div>
      </div>`;
        submitRegisterForm();
    });
}

/** Reagiert auf das Submit des Registrierungs-Formulars */
function submitRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        clearFormErrors(form);
        form.classList.remove('was-validated');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        if (form.password.value !== form.password_confirm.value) {
            setFieldError(form, 'password_confirm', 'Passwörter stimmen nicht überein');
            return;
        }
        const data = {
            title:       form.title.value.trim(),
            firstname:   form.firstname.value.trim(),
            lastname:    form.lastname.value.trim(),
            email:       form.email.value.trim(),
            username:    form.username.value.trim(),
            phone:       form.phone.value.trim(),
            password:    form.password.value,
            adress_fk:   Number(form.adress_fk.value),
            payment_fk:  Number(form.payment_fk.value)
        };
        try {
            const resp = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await resp.json().catch(() => ({}));
            if (resp.ok && json.success) {
                // Nach erfolgreichem Register: Login laden (Navbar-Update in 2ndScript.js)
                document.getElementById('login_link')?.click();
            } else {
                showFormError(form, json.errors || ['Registrierung fehlgeschlagen']);
            }
        } catch {
            showFormError(form, ['Server nicht erreichbar']);
        }
    });
}

function loadUser(){
    const container = document.getElementById("main-container");
    container.innerHTML =`<div class="container col-6">
            <h1>Meine Daten</h1>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="firstname">Vorname</th>
                        <td>Rainer</td>
                    </tr>
                    <tr>
                        <th scope="lastname">Nachname</th>
                        <td>Maier</td>
                    </tr>
                     <tr>
                        <th scope="email">Email Adresse</th>
                        <td>test@mail.com</td>
                    </tr>
                     <tr>
                        <th scope="adress"> Adresse</th>
                        <td>Straße 1, 1020 Wien, Austria</td>
                    </tr>
                     <tr>
                        <th scope="pyment_method">Zahlungsmethode</th>
                        <td>Paypal</td>
                    </tr>
                </tbody>
                <br />
            </table>
            <button type="button" class="btn btn-primary" id="changeUserDetails">Stammdaten bearbeiten</button>
            <br/>
             <br/>
             
            <form>
            <h4>Passwort ändern:</h4>
            <form>
                <label for="old_password">Altes Passwort:</label>
                <input type="password" class="form-control" id="old_password" name="old_password" required>

                <label for="new_password">Neues Passwort:</label>
                <input type="password" class="form-control" id="new_password" name="new_password" required>

                <label for="confirm_password">Neues Passwort bestätigen:</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                <br />
                <button type="submit" class="btn btn-primary">Passwort ändern</button>
            </form>`
    document.getElementById("changeUserDetails").addEventListener('click', function() {
        openUserModal();


    })
}


// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    LoadLoginForm();
    LoadRegisterForm();
});

function closeUserModal() {
    document.getElementById('UserModal').style.display = 'block';
    document.getElementById('UsermodalBackdrop').style.display = 'block';
}

function openUserModal() {
    document.getElementById('UserModal').style.display = 'none';
    document.getElementById('UsermodalBackdrop').style.display = 'none';
}