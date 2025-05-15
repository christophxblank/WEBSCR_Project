document.addEventListener('DOMContentLoaded', () => {
    LoadItemPage();

    document.getElementById('nav-admin-products').addEventListener('click', function() {
        loadProductCreationForm();
    });
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
                <button class="btn btn-primary" style="margin-top: auto"  onclick="addToCart(${item.id})">In den Warenkorb</button>
                <button class="btn btn-warning edit-button" style="display:none" id="editButton.${item.id}">bearbeiten</button>
              </div>
            </div>
          </div>
        `);
            });
            adminview();
        })
        .catch(err => {
            console.error(err);
            document.getElementById('itemsList').innerHTML =
                '<p>Fehler beim Laden der Artikel.</p>';
        });
    }


async function adminview() {
    const { authenticated,userId } = await checkAuth();
    if (!authenticated) {
        return;
    }
    fetch("api/auth/session")
        .then(res => res.json())
        .then(data => {
                let role = data.role;
                console.log(role);
                if (role === "admin") {
                    document.querySelectorAll('.edit-button').forEach(btn => {
                        btn.style.display = 'block';
                        btn.addEventListener('click', function() {
                            console.log('Edit button clicked');
                            const ItemID = this.id.split('.')[1];
                            loadProductEditForm(ItemID);
                        });
                    });}}
        );}


function loadProductEditForm(ItemID) {

     fetch(`/items/${ItemID}`)
            .then(res => res.json())
            .then(data => {
                document.getElementById("main-container").innerHTML = `
                    <div class="container col-8"><div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" id="name" name="name" value="${data.name}">
                    </div>
                    <div class="form-group">
                        <label for="description">Beschreibung:</label>
                        <textarea class="form-control" id="description" name="description">${data.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="price">Preis:</label>
                        <input type="number" class="form-control" id="price" name="price" value="${data.price}">
                    </div>
                    <!--<div class="form-group">
                        <label for="category">Kategorie:</label>
                        <select class="form-control" id="category" name="category">
                        </select>
                       </div>  -->
                       <button class="btn btn-primary" id="saveItemChanges">Speichern</button>
                       <button class="btn btn-danger" id="deleteItem">Löschen</button>
                </div> `;
                document.getElementById('saveItemChanges').addEventListener('click', () => {
                    saveProductDetails(ItemID);
                });
                document.getElementById('deleteItem').addEventListener('click', () => {
                    deleteItem(ItemID);
                });
            });
 }

 function deleteItem(id) {
     fetch(`/items/${id}`, {
         method: 'DELETE'
     })
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json();
         })
         .then(data => {
             console.log(data);
             loadItems();
         })
         .catch(error => {
             console.error('There was a problem with the fetch operation:', error);
         });
 }



function saveProductDetails(id) {
    const updatedProduct = {
        name: document.querySelector('#name').value,
        price:  document.querySelector('#price').value,
        description: document.querySelector('#description').value,
    };
    console.log(updatedProduct);

    fetch(`/items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
    })
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(() => {
            alert('Daten erfolgreich gespeichert!');
        })
        .catch(err => {
            console.error(err);
            alert('Fehler beim Speichern: ' + err.message);
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
});  //Suchfeld


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
     let html = `<div class="container col-6"><h1> Produkt hinzufügen</h1>

            <form  method="post" enctype="multipart/form-data">
                <label for="product_name"> Produktname</label>
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

