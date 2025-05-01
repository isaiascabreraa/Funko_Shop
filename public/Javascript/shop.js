
let characters = [];
let products;

//Initialize
document.addEventListener('DOMContentLoaded', () => {
  products = document.getElementById('products');
  const form = document.getElementById('shop_filters');

  fetchCharacters();
  form.addEventListener('submit', event => {
    event.preventDefault();
    filterAndRender();
  });
});

async function fetchCharacters() {
  try {
    const res = await fetch('/data/characters');
    characters = await res.json();
    renderProducts(characters);
  } catch (err) {
    console.error('Error cargando productos:', err);
    products.innerHTML = '<p>Error al cargar productos.</p>';
  }
}

//Filter
function filterAndRender() {
  const searchVal = document.getElementById('items_search').value.trim().toLowerCase();
  const sortVal = document.getElementById('items_sort').value;
  const rangeVal = Number(document.getElementById('items_range').value);

  let filtered = characters;

  if (searchVal) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchVal) ||
      (c.brand_name && c.brand_name.toLowerCase().includes(searchVal))
    );
  }

  filtered = filtered.filter(c => Number(c.price) <= rangeVal);

  if (sortVal === 'precio_asc') {
    filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortVal === 'precio_desc') {
    filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  renderProducts(filtered);
}

//Render
function renderProducts(list) {
  products.innerHTML = '';
  if (list.length === 0) {
    products.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  list.forEach(c => {
    const a = document.createElement('a');
    a.className = 'product_item';
    a.href = `/shop/item/${c.id}`;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = c.primary_image;
    img.alt = c.name;
    figure.appendChild(img);
    a.appendChild(figure);

    const desc = document.createElement('div');
    desc.className = 'product_description';

    const brand = document.createElement('span');
    brand.textContent = c.brand_name;
    desc.appendChild(brand);

    const title = document.createElement('h2');
    title.textContent = c.name;
    desc.appendChild(title);

    const price = document.createElement('p');
    price.textContent = c.price;
    desc.appendChild(price);

    const payMethods = document.createElement('div');
    payMethods.className = 'payment_methods';
    const payText = document.createElement('span');
    payText.textContent = c.payments;
    payMethods.appendChild(payText);
    desc.appendChild(payMethods);

    a.appendChild(desc);
    products.appendChild(a);
  });
}
