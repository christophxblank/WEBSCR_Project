async function includeHTML(id, file) {      //head und navbar inkludieren
    const res = await fetch(file);
    const htmlText = await res.text();
    document.getElementById(id).innerHTML = htmlText;
}

function loadItems(){
    fetch("/api/items")
        .then(res => res.json())
        .then(data => {
            let htmlCode = "";
            for (let item of data) {
                htmlCode += `<article>
                            <strong>${item.name}</strong><br>
                            <small>${item.price} €</small><br>
                            <small>${item.description}</small><br>
                            <small>${item.category.name}</small><br>
                            <small><img src="${item.imageUrl}" style="max-width: 150px; height: auto;">
                            <button type="button" class="btn btn-primary add-to-cart" data-id="${item.id}" data-name="${item.name}" type="submit">Add to Cart</button></small><br>
                         </article><hr>`;
            }
            document.getElementById("itemsList").innerHTML = htmlCode;

            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    let item = {
                        id: this.dataset.id,
                        name: this.dataset.name,
                    };

                    fetch("/cart/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(item)  // Nur ID senden
                    })
                        .then(response => {
                            if (response.ok) {
                                alert(`Item mit ID ${item.name} wurde zum Warenkorb hinzugefügt!`);
                            } else {
                                alert("Fehler beim Hinzufügen zum Warenkorb.");
                            }
                        });
                });
            });


        });
}

function loadCategories(){
    fetch("/api/categories")
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
    fetch("/api/users")
        .then(res => res.json())
        .then(data => {
            let htmlCode = "";
            for (let user of data) {
                htmlCode += `<article>
                            <strong>${user.username}</strong><br>
                            <small>${user.phone}</small><br>
                            <small>${user.adress.street}</small><br>
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
    loadCategories();
    loadItems();
    loadUsers();

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
