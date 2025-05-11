

document.addEventListener('DOMContentLoaded', () => {
    fetch('/session');    // Session initialisieren
    setupCart();
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
        .then(cart => {
            let html = '';
            if (cart.length === 0) {
                html = '<p>Dein Warenkorb ist leer.</p>';
            } else {
                cart.forEach(item => {
                    html += `<p><strong>${item.name}</strong> - ${item.price} €</p>`;
                });
            }
            document.getElementById('cartContent').innerHTML = html;
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

function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    document.getElementById('modalBackdrop').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('modalBackdrop').style.display = 'none';
}



