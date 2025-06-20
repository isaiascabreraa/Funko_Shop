import Swiper from 'swiper'
import 'swiper/css'

// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.carousel_wrapper.swiper', {
  slidesPerView: 8,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.carousel_button.right',
    prevEl: '.carousel_button.left'
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    1800: { slidesPerView: 5 },
    1024: { slidesPerView: 4 },
    768: { slidesPerView: 3 },
    480: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  }
})
