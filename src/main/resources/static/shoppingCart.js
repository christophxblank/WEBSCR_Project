

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
    const { authenticated, role } = await checkAuth();
    if (!authenticated) {
        alert('Bitte melde dich zuerst an, um eine Bestellung aufzugeben.');
        return;
    }
    else alert("Bestellung erfolgreich aufgegeben");

    //// Hier könnte der Code für die Bestellung stehen

}




async function checkAuth() {
    try {
        const res = await fetch('/api/auth/session', {
            credentials: 'include'   // schickt JSESSIONID-Cookie mit
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { authenticated, role } = await res.json();
        return { authenticated, role };
    } catch (e) {
        console.error('Fehler beim Prüfen der Session:', e);
        return { authenticated: false, role: null };
    }
}


function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}



