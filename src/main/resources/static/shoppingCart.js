

document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart/session');    // Session initialisieren
    setupCart();
    document.getElementById("OrderButton").addEventListener("click", function() {
        viewOrder();
    });
});



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
            console.log('--- CartItems vom Server:', cartItems);
            let html = '';
            let sum=0;
            let ItemSum=0;
            if (cartItems.length === 0) {
                html = '<p>Dein Warenkorb ist leer.</p>';
            } else {
                cartItems.forEach(ci => {
                    html += `
                              <div class="cart-item"<p><strong>${ci.item.name}</strong> - ${ci.item.price.toFixed(2)} € 
                            Anzahl: ${ci.quantity}   
                            <button type="button" id="AddButton.${ci.item.id}" class="btn btn-primary" onclick="addToCart(${ci.item.id})">+</button>
                            <button type="button" id="DeleteButton.${ci.item.id}" class="btn btn-danger" onclick="deleteFromCart(${ci.item.id})">x</button></p> 
                              </div>`;
                    sum+=ci.item.price*ci.quantity;
                    ItemSum+=ci.quantity;
                });
            }
            document.getElementById('cartContent').innerHTML = html;
            document.getElementById('cartSum').innerHTML = sum;
            document.getElementById('cartItemSum').innerHTML = ItemSum;
            openCartModal();
        })
        .catch(err => console.error('Fehler beim Laden des Warenkorbs:', err));

}

function addToCart(id) {
    fetch(`/cart/add/${id}`, { method: 'POST' })
        .then(res => {
            if (res.ok) {
                loadCart();
            } else {
                console.error('Fehler beim Hinzufügen zum Warenkorb');
            }
        })
        .catch(err => console.error('Fehler beim Hinzufügen zum Warenkorb:', err));
}

function deleteFromCart(id) {
    fetch(`/cart/delete/${id}`, { method: 'POST' })
        .then(res => {
            if (res.ok) {
                loadCart();
            } else {
                console.error('Fehler beim Löschen aus dem Warenkorb');
            }
        })
        .catch(err => console.error('Fehler beim Löschen aus dem Warenkorb:', err));
}


async function viewOrder() {
    const { authenticated,userId } = await checkAuth();
    if (!authenticated) {
        alert('Bitte melde dich zuerst an, um eine Bestellung aufzugeben.');
        return;
    }
    fetch("api/auth/session")
    .then(res => res.json())
    .then(data => {
       let userId = data.user_id;
        loadOrder();
        closeCartModal();
        viewUserdetails(userId);
        console.log(data);
    }
    );
}

async function checkAuth() {
    try {
        const res = await fetch('/api/auth/session', {
            credentials: 'include'   // schickt JSESSIONID-Cookie mit
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { authenticated, role, userId } = await res.json();
        return { authenticated, role, userId };
    } catch (e) {
        console.error('Fehler beim Prüfen der Session:', e);
        return { authenticated: false, role: null, userId: null };
    }
}


function loadOrder() {   //very similar to loadCart()
    fetch('/cart')
        .then(res => res.json())
        .then(cartItems => {
            console.log('Bestellitems', cartItems);
            let html = '';
            let sum=0;
            let ItemSum=0;
            if (cartItems.length === 0) {
                html = '<p>Deine Bestellung ist leer.</p>';
            } else {
                cartItems.forEach(ci => {
                    html += ` <div class="container col-8">
                               <table class="table table-striped centered-table">
                               <thead><tr>
                               <th>Name</th>
                               <th>Preis</th>
                               <th>Anzahl
                               <th>Summe</th>
                               </tr></thead>
                               <tbody> <tr>
                               <td>${ci.item.name}</td>
                               <td>${ci.item.price.toFixed(2)} €</td>
                               <td>${ci.quantity}</td>
                               <td>${(ci.item.price*ci.quantity).toFixed(2)} €</td>
                               </tr> </tbody></table></div>
                              `;
                    sum+=ci.item.price*ci.quantity;
                });
            }
            html+= `<div class="container col-8">Gesamt: ${sum.toFixed(2)} €</div><br><br>
`;
            document.getElementById('main-container').innerHTML = html;
        })
        .catch(err => console.error('Fehler beim Laden der Bestellung:', err));

}

function viewUserdetails(userId){

    fetch(`/users/${userId}`, {
        credentials: 'include'    // sendet das JSESSIONID-Cookie mit
    })
    .then(res => res.json())
    .then(user => {

        let container = document.getElementById('user-container');
        container.innerHTML += `
          <div class="user-card">
            <h2>${user.first_name} ${user.last_name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Rolle:</strong> ${user.role}</p>
            <p><strong>Adresse:</strong> ${user.address.street}</p>
            <p><strong>Telefon:</strong> ${user.phone}</p>
            <p><strong>Zahlungsart:</strong> ${user.payment_method.name}</p>
          </div>`;
        });

    }




function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}



