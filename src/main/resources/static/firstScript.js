// app.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/session');    // Session initialisieren
    loadCategories();
    setupCart();
    loadItems();
});

function loadCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    container.innerHTML = '';  // Reset
    fetch('/categories')
        .then(res => res.json())
        .then(data => {
            data.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'list-group-item list-group-item-action';
                btn.textContent = cat.name;
                btn.addEventListener('click', () => {
                    loadItems(cat.id);
                    // Aktive Markierung
                    container.querySelectorAll('button')
                        .forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
                container.appendChild(btn);
            });
        })
        .catch(err => console.error('Fehler beim Laden der Kategorien:', err));
}

function loadItems(categoryId = null) {
    let url = '/items';
    if (categoryId !== null) {
        url += `?categoryId=${encodeURIComponent(categoryId)}`;
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Netzwerk-Fehler beim Laden der Items');
            return res.json();
        })
        .then(data => {
            const list = document.getElementById('itemsList');
            list.innerHTML = '';  // Reset
            data.forEach(item => {
                list.insertAdjacentHTML('beforeend', `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="${item.image_url}"
                   class="card-img-top fixed-img"
                   alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.price} €</p>
                <p class="card-text">${item.description}</p>
                <button class="btn btn-primary"
                        onclick="addToCart(${item.id})">
                  In den Warenkorb
                </button>
              </div>
            </div>
          </div>
        `);
            });
        })
        .catch(err => {
            console.error(err);
            document.getElementById('itemsList').innerHTML =
                '<p>Fehler beim Laden der Artikel.</p>';
        });
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
