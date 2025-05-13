

document.addEventListener('DOMContentLoaded', () => {
    fetch('/cart/session');    // Session initialisieren
    setupCart();
    document.getElementById("OrderButton").addEventListener("click", function() {
        viewOrder();
    });
});

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
            document.getElementById('cartSum').innerHTML = (sum).toFixed(2);
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
       viewUserdetails(userId);
        loadOrder();
        closeCartModal();

        console.log(data);
    }
    );
}

function viewUserdetails(userId){
    document.getElementById('user-container').innerHTML = "";

    fetch(`/users/${userId}`, {
        credentials: 'include'    // sendet das JSESSIONID-Cookie mit
    })
        .then(res => res.json())
        .then(user => {

            let container = document.getElementById('user-container');
            container.innerHTML += `
          <div class=" container col-4 ordercontainer"><br>
            <h5>Name: ${user.first_name} ${user.last_name}</h5>
            <p><strong>Email:</strong> ${user.email}</p>
            <br>
            <p><strong>Lieferadresse:</strong></p>
            <p><strong>Straße:</strong> ${user.address.street}</p>
            <p><strong>PLZ:</strong> ${user.address.plz}</p>
            <p><strong>Land:</strong> ${user.address.country}</p>
            <p><strong>Zahlungsart:</strong> ${user.payment_method.name}</p>
            </div>`;
        });

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
                html += ` <div class="container col-8 ordercontainer" ><h1>Ihre Bestellung:</h1>`;
                cartItems.forEach(ci => {
                    html += `
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
                               </tr> </tbody></table>
                              `;
                    sum+=ci.item.price*ci.quantity;
                });
                html+= `<h5><strong>Gesamt: ${sum.toFixed(2)} €</h5></strong>
                        <button type="button" class="btn btn-primary" id="ConfirmOrder">Jetzt bestellen</button>
          </div><br><br>`;
            }
            document.getElementById('main-container').innerHTML = html;
            document.getElementById('ConfirmOrder').addEventListener('click', function() {
                alert("Vielen Dank für Ihre Bestellung, Sie werden zum externen Zahlungssystem weitergeleitet.");

                window.open("https://www.paypal.com/de/signin");

                // Zahlungslogik mit Externen Anbietern


                fetch("/orders",
                    {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cartItems)
                    })
                    .then(res => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        return res.json();
                    })
                .then(order => {
                        console.log(order);
                    })
                    .catch(err => console.error('Fehler beim Speichern der Bestellung:', err));
                document.getElementById('cartItemSum').innerHTML = "0";
                document.getElementById('useroverview').click();
            });
        })
        .catch(err => console.error('Fehler beim Laden der Bestellung:', err));

}


function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}



