
const products = [
    {
        brand: "Star Wars",
        name: "Baby Yoda",
        price: "$1799,99",
        payments: "3 Cuotas Sin Interes",
        image: "../../Multimedia/FunkosInterior/baby-yoda-1.webp"
    },{
        brand: "Pokemon",
        name: "Charmander",
        price: "$1799,99",
        payments: "3 Cuotas Sin Interes",
        image: "../../Multimedia/FunkosInterior/charmander-1.webp"
    },{
        brand: "Harry Potter",
        name: "Harry Potter",
        price: "$1799,99",
        payments: "3 Cuotas Sin Interes",
        image: "../../Multimedia/FunkosInterior/harry-1.webp"
    }
];

const shop_products = document.getElementsByClassName("shop_items")[0];

products.forEach( product => {

    const product_item = document.createElement("a");
    product_item.classList.add("product_item");
    product_item.href = "../HTML/item.html";
    
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    figure.appendChild(img);
    product_item.appendChild(figure);

    const description = document.createElement("div");
    description.classList.add("product_description");

    const brand = document.createElement("span");
    brand.textContent = product.brand;
    description.appendChild(brand);

    const name = document.createElement("h2");
    name.textContent = product.name;
    description.appendChild(name);

    const price = document.createElement("p");
    price.textContent = product.price;
    description.appendChild(price);

    const payments = document.createElement("p");
    payments.textContent = product.payments;
    description.appendChild(payments);

    product_item.appendChild(description);
    shop_products.appendChild(product_item)
});

