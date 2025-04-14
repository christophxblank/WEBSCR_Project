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
                            <small>${item.category}</small><br>
                            <small><img src="${item.imageUrl}"></small><br>
                         </article><hr>`;
            }
            document.getElementById("itemsList").innerHTML = htmlCode;
        });
}

document.addEventListener("DOMContentLoaded", function () {
    loadItems(); })