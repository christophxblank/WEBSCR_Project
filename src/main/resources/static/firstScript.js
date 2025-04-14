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

document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    loadItems();

})