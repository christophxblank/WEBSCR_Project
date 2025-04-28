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
                            <small><img src="${item.imageUrl}" style="max-width: 150px; height: auto;"></small><br>
                         </article><hr>`;
            }
            document.getElementById("itemsList").innerHTML = htmlCode;
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


document.addEventListener("DOMContentLoaded", function () {
    includeHTML("head-container", "./include/head.html");
    includeHTML("navbar-container", "./include/navbar.html");
    loadCategories();
    loadItems();
    loadUsers()

})