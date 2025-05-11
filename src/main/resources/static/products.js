document.addEventListener('DOMContentLoaded', async () => {
    const catContainer = document.getElementById('categoryContainer');
    const itemContainer = document.getElementById('itemContainer');

    // Kategorien laden
    const cats = await fetch('/api/categories').then(r => r.json());
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'list-group-item list-group-item-action';
        btn.textContent = cat.name;
        btn.addEventListener('click', () => loadItems(cat.id));
        catContainer.appendChild(btn);
    });
    if (cats.length) loadItems(cats[0].id);
});

async function loadItems(categoryId) {
    const itemContainer = document.getElementById('itemContainer');
    if (!itemContainer) return;

    try {
        const resp = await fetch(`/api/items?categoryId=${categoryId}`);
        if (!resp.ok) {
            console.error('Items-Request fehlgeschlagen', resp.status);
            return;
        }

        // 1) Raw JSON einlesen
        const payload = await resp.json();
        console.log('>>> /api/items?categoryId=', categoryId, '->', payload);

        // 2) Normalisieren: falls es ein Objekt mit items-Array ist
        const items = Array.isArray(payload)
            ? payload
            : Array.isArray(payload.items)
                ? payload.items
                : [];

        // 3) Rendern oder Hinweismeldung
        itemContainer.innerHTML = '';
        if (items.length === 0) {
            itemContainer.innerHTML = '<p class="text-muted">Keine Produkte gefunden.</p>';
            return;
        }

        items.forEach(item => {
            // Falls name/price fehlen, Abbruch für dieses Objekt
            const name  = item.name  ?? '(kein Name)';
            const price = item.price ?? '(kein Preis)';

            const imgSrc = item.imageUrl
                ?? item.image_url
                ?? '/img/placeholder.png';

            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
        <div class="card h-100">
          <img src="${imgSrc}" class="card-img-top" alt="${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">€${price}</p>
            ${item.rating != null ? `<p class="card-text">⭐ ${item.rating}</p>` : ''}
            <button class="btn btn-primary" onclick="addToCart(${item.id})">
              In den Warenkorb
            </button>
          </div>
        </div>
      `;
            itemContainer.appendChild(col);
        });
    } catch (err) {
        console.error('Fehler beim Laden der Produkte', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Kategorien- und Items-Initialisierung hier belassen…
});

async function addToCart(itemId) {
    await fetch('/session/cart/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ itemId })
    });
    updateCartCount();
}

async function updateCartCount() {
    const count = await fetch('/api/cart/count')
        .then(r => r.json())
        .then(j => j.count);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = count;
}