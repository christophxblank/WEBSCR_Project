document.addEventListener('DOMContentLoaded', () => {
    LoadItemPage();
});

 function LoadItemPage(){
document.getElementById("product_overview").addEventListener('click', () => {
    LoadHTMLmain();
    loadCategories();


});
}

function LoadHTMLmain() {
    document.getElementById("main-container").innerHTML = `
<div class="col-2" >
    <div class="list-group" id="categories-container">
    <h2>Categories</h2>
<ul id="categoryList"></ul>
</div>
</div>
<div class="col-9">
 <div class="row" id="itemsList"></div>
</div>`;
}



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
          <div class="col-md-3 mb-3">
            <div class="card h-100">
              <img src="${item.image_url}"
                   class="card-img-top fixed-img"
                   alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                 <p class="card-text">Bewertung: ${item.rating}</p>
                <p class="card-text" style="margin-top: auto">${item.price} €</p>    
                <button class="btn btn-primary" style="margin-top: auto"  onclick="addToCart(${item.id})">
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

