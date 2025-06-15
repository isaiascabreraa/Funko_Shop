let characters = [];
let products;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  products = document.getElementById('products');
  const form = document.getElementById('shop_filters');

  fetchCharacters();

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      filterAndRender();
    });
  }

  // Sidebar móvil
  const toggleBtn = document.getElementById('filterToggle');
  const sidebar = document.getElementById('mobileSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  if (toggleBtn && sidebar && closeBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });

    // Cerrar sidebar al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
});

// Fetch data
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

// Filter logic
function filterAndRender() {
  const searchVal = document.getElementById('items_search').value.trim().toLowerCase();
  const sortVal = document.getElementById('items_sort').value;
  const minPrice = Number(document.getElementById('min-price').value) || 0;
  const maxPrice = Number(document.getElementById('max-price').value) || Infinity;

  let filtered = characters;

  if (searchVal) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchVal) ||
      (c.brand_name && c.brand_name.toLowerCase().includes(searchVal))
    );
  }

  filtered = filtered.filter(c => {
    const price = Number(c.price);
    return price >= minPrice && price <= maxPrice;
  });

  if (sortVal === 'precio_asc') {
    filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortVal === 'precio_desc') {
    filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  renderProducts(filtered);
}

// Render products
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
    figure.className = 'image_container';

    const primaryImg = document.createElement('img');
    primaryImg.src = c.primary_image;
    primaryImg.alt = c.name;
    primaryImg.className = 'primary_image';

    const secondaryImg = document.createElement('img');
    secondaryImg.src = c.secondary_image;
    secondaryImg.alt = `${c.name} - alternate`;
    secondaryImg.className = 'secondary_image';

    figure.appendChild(primaryImg);
    figure.appendChild(secondaryImg);
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
