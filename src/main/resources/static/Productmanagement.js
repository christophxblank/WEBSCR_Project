document.addEventListener('DOMContentLoaded', () => {
    LoadItemPage();
    document.getElementById('nav-admin-products').addEventListener('click', function() {
        LoadHTMLmain();
        loadProductCreationForm();});


});

 function LoadItemPage(){
document.getElementById("product_overview").addEventListener('click', () => {
    LoadHTMLmain();
    loadCategories();
});
}

function LoadHTMLmain() {
     document.getElementById("user-container").innerHTML = "";
    document.getElementById("orders-container").innerHTML = "";
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



document.addEventListener('DOMContentLoaded', () => {
    const input  = document.getElementById('searchItem');
    const suggs  = document.getElementById('searchSuggestions');

    // Debounce-Hilfsfunktion zum Warten auf Eingaben
    function debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    // Vorschläge holen und anzeigen
    async function fetchSuggestions(term) {
        if (!term) {
            suggs.style.display = 'none';
            return;
        }
        try {
            const res   = await fetch(`/items/search?q=${encodeURIComponent(term)}`);
            const items = await res.json();
            renderSuggestions(items);
        } catch (e) {
            console.error('Suche fehlgeschlagen', e);
        }
    }

    // Vorschlags-Dropdown befüllen
    function renderSuggestions(items) {
        if (!items.length) {
            suggs.style.display = 'none';
            return;
        }
        suggs.innerHTML = items
            .map(
                item => `
      <button 
        type="button" 
        class="list-group-item list-group-item-action"
        data-id="${item.id}"
      >
        ${item.name}
      </button>`
            )
            .join('');
        suggs.style.display = 'block';
    }

    // Klick auf Vorschlag: in Suchfeld kopieren & Liste schließen
    suggs.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const name = btn.textContent;
        const id   = btn.dataset.id;
        input.value = name;
        suggs.style.display = 'none';

        LoadHTMLmain();
        loadCategories();
        loadSearchItem(id); // Artikel laden

    });

    // Wenn Input den Fokus verliert, Dropdown schließen
    input.addEventListener('blur', () => {
        setTimeout(() => (suggs.style.display = 'none'), 150);
    });

    // Auf jeden Tastendruck, debounced, Vorschläge holen
    input.addEventListener(
        'input',
        debounce(e => fetchSuggestions(e.target.value))
    );
});


 function loadSearchItem(id){

     fetch(`/items/${id}`)
             .then(res => {
                 if (!res.ok) throw new Error('Netzwerk-Fehler beim Laden der Items');
                 return res.json();
             })
             .then(item => {
                 const list = document.getElementById('itemsList');

                 list.innerHTML=`
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
        `;

             })
    .catch(err => {
        console.error(err);
        document.getElementById('itemsList').innerHTML =
            '<p>Fehler beim Laden der Artikel.</p>';
    });
 }


 function loadProductCreationForm() {
     let html = `<div class="container col-6"><h1> Formular</h1>

            <form  method="post" enctype="multipart/form-data">
                <label for="product_name"> PRoduktname</label>
                <input class="form-control" id="product_name" type="text" name="product_name_form" required placeholder="Produktname eingeben" />
                <br />

                <label for="descritpion"> Produktbeschreibung</label>
                <br />
                <textarea required class="form-control" name="descritption_form" required id="descritpion"
                    style=" height: 30px;">
            </textarea>
                <br />
               <label for="price"> Preis</label>
               <input class="form-control" type="number" name="price_form" required placeholder="Preis eingeben" />
                <br />
                <input required class="form-control" type="file" name="upload" />
                <br />
                <button type="submit" class="btn btn-primary">Hinzufügen</button>
                <br />
            </form></div> `;
     document.getElementById('main-container').innerHTML = html;
 }

 function createProduct(){
     document.getElementById('createProductForm').addEventListener('submit', function(e) {
         e.preventDefault();
         const formData = new FormData(this);
         fetch('/items/create', {
             method: 'POST',
             body: formData
         })

            .then(response => {
                if (response.ok) {
                    alert('Produkt erfolgreich erstellt!');
                    this.reset(); // Reset the form
                } else {
                    alert('Fehler beim Erstellen des Produkts.');
                }
            })
            .catch(error => console.error('Fehler:', error));
        }   );}
