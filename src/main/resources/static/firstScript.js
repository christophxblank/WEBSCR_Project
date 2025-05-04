async function includeHTML(id, file) {      //head und navbar inkludieren
    const res = await fetch(file);
    const htmlText = await res.text();
    document.getElementById(id).innerHTML = htmlText;
}

async function loadItems(categoryId) {
    const itemContainer = document.getElementById('itemContainer');
    if (!itemContainer) return; // Guard: nur auf der Produkte-Seite ausführen

    try {
        // 1) Request an den korrekten API-Pfad
        const resp = await fetch(`/api/items?categoryId=${categoryId}`);
        if (!resp.ok) {
            console.error('Items-Request fehlgeschlagen', resp.status);
            return;
        }

        // 2) JSON auslesen und normalisieren
        const payload = await resp.json();
        // payload kann direkt Array oder Objekt sein: { items: [...] }
        const items = Array.isArray(payload)
            ? payload
            : Array.isArray(payload.items)
                ? payload.items
                : [];

        // 3) Leeres Ergebnis anzeigen
        if (items.length === 0) {
            itemContainer.innerHTML = '<p class="text-muted">Keine Produkte gefunden.</p>';
            return;
        }

        // 4) Produkte rendern
        itemContainer.innerHTML = '';
        items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `
        <div class="card h-100">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">€${item.price}</p>
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

function loadCategories(){
    fetch("/categories")
        .then(res => res.json())
        .then(data => {
            let htmlCode = "";
            for (let category of data) {
                htmlCode += `<option value="${category.id}">${category.name}</option>`;
            }
            document.getElementById("categoryList").innerHTML = htmlCode;
        });
}

function loadUsers(){
    fetch("/users")
        .then(res => res.json())
        .then(data => {
            let htmlCode = "";
            for (let user of data) {
                htmlCode += `<article>
                            <strong>${user.username}</strong><br>
                            <small>${user.phone}</small><br>
                            <small>${user.address.street}</small><br>
                            <small>${user.paymentMethod.name}</small><br>
                            <br>
                         </article><hr>`;
            }
            document.getElementById("userList").innerHTML = htmlCode;
        });
}


function loadCart() {
    fetch("/cart")
        .then(res => res.json())
        .then(cart => {
            let html = "";

            if (cart.length === 0) {
                html = "<p>Dein Warenkorb ist leer.</p>";
            } else {
                for (let item of cart) {
                    html += `<p><strong>${item.name}</strong> - ${item.price || "Preis fehlt"} €</p>`;
                }
            }

            document.getElementById("cartContent").innerHTML = html;
            openCartModal();
        });
}





document.addEventListener("DOMContentLoaded", async function () {
    await includeHTML("head-container", "./include/head.html");
    await includeHTML("navbar-container", "./include/navbar.html");
    setupCart();
});

document.addEventListener('DOMContentLoaded', () => {
    const catContainer = document.getElementById('categoryContainer');
    if (catContainer) {
        loadCategories();
    }

    const userTable = document.getElementById('userTable');
    if (userTable) {
        loadUsers();
    }
});
function setupCart() {
    const cart = document.getElementById("cart");
    if (cart) {
        cart.addEventListener("click", function () {
            event.preventDefault();
            loadCart();
        });
    } else {
        console.error("Cart nicht gefunden!");
    }
}

function openCartModal() {
    document.getElementById("cartModal").style.display = "block";
    document.getElementById("modalBackdrop").style.display = "block";
}

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("modalBackdrop").style.display = "none";
}
