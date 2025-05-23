
document.addEventListener('DOMContentLoaded', () => {

   document.getElementById('useroverview').addEventListener('click', () => {
       document.getElementById('orders-container').innerHTML = '';
       document.getElementById('admin-content').innerHTML = '';
       viewUser();
    });
   document.getElementById('nav-admin-customers').addEventListener('click', () => {
       document.getElementById('orders-container').innerHTML = '';
       document.getElementById('admin-content').innerHTML = '';
       document.getElementById('user-container').innerHTML = '';
       document.getElementById('main-container').innerHTML = '';
       viewAllUser();
   });
});

const LOGIN_URL     = '/api/auth/login';
const REGISTER_URL  = '/api/auth/register';

// Zeigt oberhalb des Formulars eine Alert-Box mit Fehlermeldungen.

function showFormError(form, messages) {
    clearFormErrors(form);
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.innerHTML = messages.map(m => `<div>${m}</div>`).join('');
    form.prepend(alert);
}

// Entfernt alle Alert-Boxen und Invalid-Klassen aus dem Formular
function clearFormErrors(form) {
    form.querySelectorAll('.alert-danger').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(f => f.classList.remove('is-invalid'));
}

// Markiert ein Feld als invalid und zeigt Inline-Feedback
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

// Baut und lädt das Login-Formular bei Klick
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

// Reagiert auf das Submit des Login-Formulars
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
                // Nach erfolgreichem Login: Seite neu laden, Navbar-Update erfolgt in SessionScript.js
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

// Baut und lädt das Registrierungs-Formular bei Klick
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

// Reagiert auf das Submit des Registrierungs-Formulars
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
                // Nach erfolgreichem Register: Login laden (Navbar-Update in SessionScript.js)
                document.getElementById('login_link')?.click();
            } else {
                showFormError(form, json.errors || ['Registrierung fehlgeschlagen']);
            }
        } catch {
            showFormError(form, ['Server nicht erreichbar']);
        }
    });
}


async function viewUser() {
    document.getElementById('main-container').innerHTML = '';
    document.getElementById('orders-container').innerHTML = '';
    document.getElementById('user-container').innerHTML = '';

    const { authenticated,userId } = await checkAuth();
    if (!authenticated) {
        alert('Bitte zuerst einloggen.');
        return;
    }
    fetch("api/auth/session")
        .then(res => res.json())
        .then(data => {
                let userId = data.user_id;
            loadUser(userId);
            loadOrders(userId)
                console.log(data);
            }
        );
}

async function loadUser(userId) {
    currentUserId = userId;

    try {
        // 1) Nutzerdaten und Zahlungsmethoden parallel laden
        const [userRes, pmRes] = await Promise.all([
            fetch(`/users/${userId}`),
            fetch('/payment_methods')
        ]);
        if (!userRes.ok) throw new Error(`User-Laden fehlgeschlagen: ${userRes.status}`);
        if (!pmRes.ok)   throw new Error(`PaymentMethod-Laden fehlgeschlagen: ${pmRes.status}`);

        const user = await userRes.json();
        const paymentMethods = await pmRes.json();

        // 2) Optionen bauen (ohne selected)
        const paymentOptions = paymentMethods
            .map(pm => `
                <option value="${pm.id}">
                    ${pm.name}
                </option>`)
            .join('');

        // 3) HTML zusammenbauen
        const HTMLCode = `
        <div class="container col-6">
            <h1>Meine Daten</h1>
            <form id="detailsForm">
                <table class="table">
                    <tbody>
                        <tr><th>Vorname</th><td class="editable" id="first_name">${user.first_name}</td></tr>
                        <tr><th>Nachname</th><td class="editable" id="last_name">${user.last_name}</td></tr>
                        <tr><th>E-Mail</th><td class="editable" id="user_email">${user.email}</td></tr>
                        <tr><th>Straße</th><td class="editable" id="street">${user.address.street}</td></tr>
                        <tr><th>PLZ</th><td class="editable" id="plz">${user.address.plz}</td></tr>
                        <tr><th>Stadt</th><td class="editable" id="city">${user.address.city}</td></tr>
                        <tr><th>Land</th><td class="editable" id="country">${user.address.country}</td></tr>
                        <tr><th>Zahlungsmethode</th>
                            <td>
                                <select id="payment_method_id" class="form-control" disabled>
                                    ${paymentOptions}
                                </select>
                            </td>
                        </tr>
                        <tr id="passwordRow" style="display:none;">
                            <th>Passwort</th>
                            <td>
                                <input type="password" class="form-control" id="confirm_current_password" placeholder="Aktuelles Passwort">
                                <div class="invalid-feedback">Bitte Passwort eingeben</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary" id="changeUserDetails">Stammdaten bearbeiten</button>
                <button type="submit" class="btn btn-success" id="saveUserDetails" style="display:none;" disabled>Änderungen speichern</button>
            </form>

            <hr/>
            <h4>Passwort ändern</h4>
            <form id="passwordForm">
                <div class="form-group">
                    <label for="old_password">Altes Passwort</label>
                    <input type="password" class="form-control" id="old_password" name="old_password" required>
                </div>
                <div class="form-group">
                    <label for="new_password">Neues Passwort</label>
                    <input type="password" class="form-control" id="new_password" name="new_password" required>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Passwort bestätigen</label>
                    <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
                </div>
                <button type="submit" class="btn btn-primary">Passwort ändern</button>
            </form>
        </div>`;

        // 4) HTML injizieren
        document.getElementById('main-container').innerHTML = HTMLCode;

        // 5) Dropdown auf JSON-Wert setzen (snake_case payment_method)
        const pmSelect = document.getElementById('payment_method_id');
        if (pmSelect && user.payment_method && user.payment_method.id != null) {
            pmSelect.value = String(user.payment_method.id);
        }
        pmSelect.disabled = true;

        // 6) Initiale UI-Setup
        const editableFields = document.querySelectorAll('#detailsForm .editable');
        editableFields.forEach(el => el.contentEditable = false);

        const changeBtn   = document.getElementById('changeUserDetails');
        const saveBtn     = document.getElementById('saveUserDetails');
        const pwRow       = document.getElementById('passwordRow');
        const pwdInput    = document.getElementById('confirm_current_password');
        const detailsForm = document.getElementById('detailsForm');

        // 7) „Stammdaten bearbeiten“-Flow
        changeBtn.addEventListener('click', () => {
            editableFields.forEach(el => el.contentEditable = true);
            pmSelect.disabled = false;
            pwRow.style.display = '';
            changeBtn.style.display = 'none';
            saveBtn.style.display = '';
            saveBtn.disabled = true;
        });
        pwdInput.addEventListener('input', () => {
            saveBtn.disabled = !pwdInput.value.trim();
            if (pwdInput.value.trim()) pwdInput.classList.remove('is-invalid');
        });

        // 8) Stammdaten speichern
        detailsForm.addEventListener('submit', async e => {
            e.preventDefault();
            clearFormErrors(detailsForm);
            const pwd = pwdInput.value.trim();
            if (!pwd) {
                pwdInput.classList.add('is-invalid');
                return;
            }
            const updatedData = {
                oldPassword: pwd,
                firstName: document.getElementById('first_name').innerText.trim(),
                lastName:  document.getElementById('last_name').innerText.trim(),
                email:     document.getElementById('user_email').innerText.trim(),
                address: {
                    street:  document.getElementById('street').innerText.trim(),
                    plz:     document.getElementById('plz').innerText.trim(),
                    city:    document.getElementById('city').innerText.trim(),
                    country: document.getElementById('country').innerText.trim()
                },
                paymentMethodId: pmSelect.value
            };
            const res = await fetch(`/users/${currentUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (res.status === 400) {
                const err = await res.json();
                pwdInput.classList.add('is-invalid');
                pwdInput.nextElementSibling.textContent = err.error;
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert('Stammdaten erfolgreich aktualisiert');
            loadUser(currentUserId);
        });

        // 9) Passwort-Änderung bleibt unverändert
        document.getElementById('passwordForm').addEventListener('submit', async e => {
            e.preventDefault();
            clearFormErrors(e.target);
            const oldPwd     = document.getElementById('old_password').value;
            const newPwd     = document.getElementById('new_password').value;
            const confirmPwd = document.getElementById('confirm_password').value;
            if (newPwd !== confirmPwd) {
                setFieldError(e.target, 'confirm_password', 'Passwörter stimmen nicht überein');
                return;
            }
            const res = await fetch(`/users/${currentUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd })
            });
            if (res.status === 400) {
                const err = await res.json();
                setFieldError(e.target, 'old_password', err.error);
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert('Passwort erfolgreich geändert');
            e.target.reset();
        });

    } catch (err) {
        console.error('Fehler beim Laden des Nutzers:', err);
    }
}






function EditDetails() {
    // Nur die felder mit class="editable" in Inputs umwandeln
    document.querySelectorAll('td.editable').forEach(td => {
        const text = td.textContent.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.id = td.id;
        input.name = td.id;
        input.value = text;
        input.className = 'form-control';
        td.innerHTML = '';
        td.appendChild(input);
    });
    document.getElementById("saveUserDetails").addEventListener('click', function() {
        saveUserDetails();
    });

}

function saveUserDetails() {
    const updatedUser = {
        first_name: document.querySelector('#first_name input').value,
        last_name:  document.querySelector('#last_name input').value,
        email:      document.querySelector('#user_email input').value,
        address: {
            street:  document.querySelector('#street input').value,
            plz:     document.querySelector('#plz input').value,
            city:    document.querySelector('#city input').value,
            country: document.querySelector('#country input').value
        },
        paymentMethod: {
            id: Number(document.getElementById('payment_method_id').value)
        }
    };

    fetch(`/users/${currentUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    })
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(() => {
            alert('Daten erfolgreich gespeichert!');
            loadUser(currentUserId);
        })
        .catch(err => {
            console.error(err);
            alert('Fehler beim Speichern: ' + err.message);
        });
}


function loadOrders(userId) {
    fetch(`/orders?userId=${userId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(orders => {
            // Tabelle mit Buttons zum Ein-/Ausklappen
            const rows = orders.map(o => `
        <tr data-id="${o.id}">
        <td>${o.id}</td>
          <td>${o.order_date}</td>
          <td>${o.total_price.toFixed(2)} €</td>
          <td>
            <button class="btn btn-sm btn-outline-primary toggle-order-btn" data-id="${o.id}">
              Details
            </button>
            <button class="btn btn-sm btn-outline-secondary print-invoice-btn" data-id="${o.id}">Rechnung drucken</button>
          </td>
        </tr>
      `).join('');

            document.getElementById('orders-container').innerHTML = `
        <div class="container col-8">
          <h3>Bestellungen</h3>
          <table class="table table-hover" id="orders-table">
            <thead>
              <tr>
                <th>Bestellnummer</th>
                <th>Datum</th>
                <th>Gesamtpreis</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;

            document.querySelectorAll('.toggle-order-btn')
                .forEach(btn => btn.addEventListener('click', toggleOrderDetails));

            document.querySelectorAll('.print-invoice-btn').forEach(btn => btn.addEventListener('click', () => {
                    printInvoice(btn.dataset.id);
                }));
        })

        .catch(err => {
            console.error('Fehler beim Laden der Bestellungen:', err);
            document.getElementById('orders-container').innerHTML =
                `<div class="alert alert-danger">Fehler: ${err.message}</div>`;
        });
}

async function printInvoice(orderId) {
    // 1) Bestellung & Benutzer-Daten parallel laden
    const [order, user] = await Promise.all([
        fetch(`/orders/${orderId}`).then(r => r.json()),
        fetch(`/users/${currentUserId}`).then(r => r.json())
    ]);

    // 2) Rechnungsnummer & Datum
    const invoiceNumber = `INV-${orderId}-${new Date().toISOString().slice(0,10).replace(/-/g,'')}`;
    const invoiceDate   = new Date().toLocaleDateString();

    // 3) Artikel-Zeilen
    const itemsHtml = order.items.map(item => {
        const lineTotal = (item.price * item.quantity).toFixed(2);
        return `
      <tr>
        <td>${item.product_name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)} €</td>
        <td>${lineTotal} €</td>
      </tr>`;
    }).join('');

    // 4) Gesamtsumme
    const total = order.items
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
        .toFixed(2);

    // 5) Anschrift
    const addr = user.address;
    const addressHtml = `
    <p>
      ${user.first_name} ${user.last_name}<br>
      ${addr.street}<br>
      ${addr.plz} ${addr.city}<br>
      ${addr.country}
    </p>`;

    // 6) Komplettes HTML für das neue Fenster
    const html = `
  <html><head>
    <title>Rechnung ${invoiceNumber}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #ccc; padding: 8px; }
      th { background: #f0f0f0; }
      h1, h3 { margin: 0; }
    </style>
  </head><body>
    <h1>Rechnung</h1>
    <p><strong>Rechnungs-Nr.:</strong> ${invoiceNumber}<br>
    <strong>Datum:</strong> ${invoiceDate}</p>

    <h3>Kundendaten</h3>
    ${addressHtml}

    <h3>Positionen</h3>
    <table>
      <thead>
        <tr><th>Produkt</th><th>Anzahl</th><th>Einzelpreis</th><th>Summe</th></tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align:right"><strong>Gesamt</strong></td>
          <td><strong>${total} €</strong></td>
        </tr>
      </tfoot>
    </table>

    <script>
      // Sobald das Fenster geladen ist, Druckdialog öffnen
      window.onload = () => { window.print(); };
    </script>
  </body></html>`;

    // 7) Neues Fenster öffnen und Inhalt setzen
    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
}



function toggleOrderDetails(e) {     //Wenn Details schon angezeigt werden, dann löschen sonst laden
    const orderId = e.currentTarget.dataset.id;
    const row     = e.currentTarget.closest('tr');
    const next    = row.nextElementSibling;


    if (next && next.classList.contains('order-details-row')) {
        next.remove();
        return;
    }

    fetch(`/orders/${orderId}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(order => {

            const itemsHtml = order.items.map(item => `
        <tr>
          <td>${item.product_name}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toFixed(2)} €</td>
          <td><button
              class="btn btn-sm btn-danger delete-order-item-btn" data-order-id="${orderId}" data-item-id="${item.id}">Löschen </button></td>
        </tr>
      `).join('');


            const detailsRow = document.createElement('tr');
            detailsRow.classList.add('order-details-row');
            detailsRow.innerHTML = `
        <td colspan="3" class="p-0">
          <table class="table table-sm mb-0">
            <thead>
              <tr><th>Produkt</th><th>Anzahl</th><th>Preis</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </td>
      `;
            row.parentNode.insertBefore(detailsRow, row.nextSibling);
            document.querySelectorAll('.delete-order-item-btn').forEach(btn => btn.addEventListener('click',()=>{
                let OrderID = btn.dataset.orderId;
                let ItemID = btn.dataset.itemId;
              deleteOrderItem(OrderID,ItemID, row);
            }));
        })
        .catch(err => {
            console.error(`Fehler beim Laden der Details für Order ${orderId}:`, err);
        });

}

function deleteOrderItem(orderId, itemId, originalRow) {
    fetch(`/orders/${orderId}/${itemId}`, { method: 'DELETE' })
        .then(res => {})
        .then(updatedOrder => {
            const detailsRow = originalRow.nextElementSibling;    // Aus der Zeile, in der der Button geklickt wurde, löschen
            if (detailsRow && detailsRow.classList.contains('order-details-row')) {
                detailsRow.remove();
            }


            const toggleBtn = document.querySelector(`.toggle-order-btn[data-id="${orderId}"]`);  //  damit aktualisierte Liste angezeigt wird:
            if (toggleBtn) toggleBtn.click();
        })
        .catch(err => {
            console.error('Fehler beim Löschen des OrderItem:', err);
            alert('Konnte Position nicht löschen: ' + err.message);
        });
}



function viewAllUser() {
    fetch('/users')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(users => {
            const rows = users.map(user => `
        <tr data-id="${user.id}">
        <td>${user.username}</td>
          <td>${user.role}</td>
          <td>${user.active ? 'Aktiv' : 'Deaktiviert'}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary toggle-user-btn" data-id="${user.id}">
              Bestellungen anzeigen
            </button>
            <button class="btn btn-sm btn-outline-danger deactivate-user-btn" data-id="${user.id}">
              User deaktivieren
            </button>
          </td>
        </tr>
      `).join('');


            document.getElementById('main-container').innerHTML = `
        <div class="container col-8">
          <h3>User</h3>
          <table class="table table-hover" id="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Rolle</th>
                <th>Aktiv</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
            document.querySelectorAll('.deactivate-user-btn').forEach(btn => btn.addEventListener('click',()=>{
                const userId = btn.dataset.id;
                deactivateUser(userId);
            } ));

            document.querySelectorAll('.toggle-user-btn').forEach(btn => btn.addEventListener('click',()=>{
                const userId = btn.dataset.id;
                loadOrders(userId);
            } ));
        })
        .catch(err => {
            console.error('Fehler beim Laden der Bestellungen:', err);
            document.getElementById('orders-container').innerHTML =
                `<div class="alert alert-danger">Fehler: ${err.message}</div>`;
        });
}


function deactivateUser(userId) {
    fetch(`/users/admin/${userId}`, { method: 'PATCH' })
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(user => {
            alert(user.active ? 'User ist jetzt aktiv' : 'User wurde deaktiviert');
            viewAllUser();  // Liste neu laden
        })
        .catch(err => alert('Fehler: ' + err.message));
}


// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    LoadLoginForm();
    LoadRegisterForm();
});

function openUserModal() {
    document.getElementById('UserModal').style.display = 'block';
    document.getElementById('UsermodalBackdrop').style.display = 'block';
}

function closeUserModal() {
    document.getElementById('UserModal').style.display ='none';
    document.getElementById('UsermodalBackdrop').style.display = 'none';
}