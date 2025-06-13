
const swiper = new Swiper('.carousel_wrapper.swiper', {
  slidesPerView: 5,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.carousel_button.right',
    prevEl: '.carousel_button.left',
  },
  autoplay: {
    delay: 3500,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 2,
    }
  }
});
