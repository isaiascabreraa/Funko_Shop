
const products = [
    {
        name: "Baby Yoda Blue Ball",
        description: "Disfruta de una saga que sigue agregando personajes a su coleccion",
        image: "../../Multimedia/FunkosInterior/baby-yoda-1.webp"
    },{
        name: "Charmander",
        description: "Atrapa todos los que puedas y disfruta de una colleccion llena de amigos",
        image: "../../Multimedia/FunkosInterior/charmander-1.webp"
    },{
        name: "Harry Potter",
        description: "Revive los recuerdos de una saga llena de magia y encanto",
        image: "../../Multimedia/FunkosInterior/harry-1.webp"
    }
];

const home_products = document.getElementsByClassName("home_items")[0];

products.forEach(product => {
    const container = document.createElement("div");
    container.classList.add("product_item");

    const figure = document.createElement("figure");
    figure.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    container.appendChild(figure);

    const description = document.createElement("div");
    description.classList.add("product_description");

    const title = document.createElement("h2");
    title.textContent = product.name;
    description.appendChild(title);

    const paragraph = document.createElement("p");
    paragraph.textContent = product.description;
    description.appendChild(paragraph);

    const button = document.createElement("div");

    const link = document.createElement("a");
    link.href = "../HTML/shop.html";
    link.textContent = "VER COLECCIÓN";

    button.appendChild(link);
    description.appendChild(button);
    container.appendChild(description);

    home_products.appendChild(container);
});
