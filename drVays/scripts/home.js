const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navigation.classList.toggle("active");
});
const scrollTopBtn = document.getElementById("scrollTopBtn");
const mainWindow = document.getElementById("main-window");

if (scrollTopBtn && mainWindow) {
  scrollTopBtn.addEventListener("click", () => {
    mainWindow.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
  const swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
