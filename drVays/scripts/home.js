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
const modal = document.getElementById("slideModal");
const modalBody = modal.querySelector(".slide-modal__body");
const modalClose = modal.querySelector(".slide-modal__close");
const modalOverlay = modal.querySelector(".slide-modal__overlay");

function openModal(slide) {
  modalBody.innerHTML = slide.innerHTML;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".slide-more-btn")) {
    const slide = e.target.closest(".swiper-slide");
    if (slide) openModal(slide);
  }
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  const swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      effect: "fade",
      clickable: true,
          navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init(s) {
          const current = document.getElementById("slide-current");
          const total = document.getElementById("slide-total");
          if (total) total.textContent = String(s.slides.length).padStart(2, "0");
          if (current) current.textContent = String(s.realIndex + 1).padStart(2, "0");
        },
        slideChange(s) {
          const current = document.getElementById("slide-current");
          if (current) current.textContent = String(s.realIndex + 1).padStart(2, "0");
        },
      },
    });
