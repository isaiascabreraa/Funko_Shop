
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel_items');
    const btnLeft  = document.querySelector('.carousel_button.left');
    const btnRight = document.querySelector('.carousel_button.right');
  
    if (!carousel || !btnLeft || !btnRight) {
      console.error('No se encontró la clase: carousel_items | carousel_button');
      return;
    }
  
    // Ocultamos el carrusel durante la inicialización.
    carousel.style.scrollBehavior = 'auto';
  
    // Limitamos a 15 ítems por carrusel
    while (carousel.children.length > 15) {
      carousel.removeChild(carousel.lastElementChild);
    }
    const original_items = Array.from(carousel.children);
  
    // Dimensiones.
    const item_width      = original_items[0].offsetWidth + 50;
    const total_items     = original_items.length;
    const original_width  = item_width * total_items;
  
    // Clonar originales a ambos extremos.
    original_items.slice().reverse().forEach(node => {
      carousel.insertBefore(node.cloneNode(true), carousel.firstChild);
    });
    original_items.forEach(node => {
      carousel.appendChild(node.cloneNode(true));
    });
  
    // Posicionamos el scroll al comienzo del bloque "original".
    carousel.scrollLeft = original_width;
  
    // Visualizacion.
    carousel.style.visibility = 'visible';
    carousel.style.scrollBehavior = 'smooth';
  
    let isAnimating = false;
    function scrollCarousel(direction) {
      if (isAnimating) return;
      isAnimating = true;
      carousel.scrollBy({ left: direction * item_width, behavior: 'smooth' });
      setTimeout(() => {
        carousel.style.scrollBehavior = 'auto';
  
        if (carousel.scrollLeft >= original_width * 2) {
          carousel.scrollLeft -= original_width;
        } else if (carousel.scrollLeft < original_width) {
          carousel.scrollLeft += original_width;
        }
  
        carousel.style.scrollBehavior = 'smooth';
        isAnimating = false;
      }, 300); // Duración de la animación.
    }
  
    btnLeft.addEventListener('click',  () => scrollCarousel(-1));
    btnRight.addEventListener('click', () => scrollCarousel( 1));
  });
  