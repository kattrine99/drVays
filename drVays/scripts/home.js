/* ── Burger menu ── */
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

if (burger && navigation) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navigation.classList.toggle("active");
  });
}

/* ── Scroll to top/main ── */
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

/* ── About slider modal ── */
const slideModal = document.getElementById("slideModal");

if (slideModal) {
  const modalBody = slideModal.querySelector(".slide-modal__body");
  const modalClose = slideModal.querySelector(".slide-modal__close");
  const modalOverlay = slideModal.querySelector(".slide-modal__overlay");

  function openModal(slide) {
    modalBody.innerHTML = slide.innerHTML;
    slideModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    slideModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const moreBtn = e.target.closest(".slide-more-btn");

    if (moreBtn) {
      const slide = e.target.closest(".swiper-slide");
      if (slide) openModal(slide);
    }
  });

  modalClose?.addEventListener("click", closeModal);
  modalOverlay?.addEventListener("click", closeModal);

  window.closeSlideModal = closeModal;
}

/* ── About clinic swiper ── */
const aboutSwiperEl = document.querySelector(".mySwiper");

if (aboutSwiperEl) {
  const aboutSwiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "fade",
    autoHeight: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      init(swiper) {
        updateAboutCounter(swiper);
      },

      slideChange(swiper) {
        updateAboutCounter(swiper);
      },
    },
  });
}

function updateAboutCounter(swiper) {
  const current = document.getElementById("slide-current");
  const total = document.getElementById("slide-total");

  if (total) {
    total.textContent = String(swiper.slides.length).padStart(2, "0");
  }

  if (current) {
    current.textContent = String(swiper.realIndex + 1).padStart(2, "0");
  }
}

/* ── Doctors swiper ── */
const doctorSwiperEl = document.querySelector(".doctorSwiper");

if (doctorSwiperEl) {
  const doctorSwiper = new Swiper(".doctorSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,

    pagination: {
      el: ".doctorPagination",
      clickable: true,
    },

    breakpoints: {
      601: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

/* ── Doctor modal with gallery + thumbs ── */
const doctorModal = document.getElementById("doctorModal");

let doctorGallerySwiper = null;
let doctorThumbSwiper = null;

if (doctorModal) {
  const doctorModalOverlay = doctorModal.querySelector(".doctor-modal__overlay");
  const doctorModalClose = doctorModal.querySelector(".doctor-modal__close");

  const galleryWrapper = doctorModal.querySelector(
    ".doctorGallerySwiper .swiper-wrapper"
  );

  const thumbWrapper = doctorModal.querySelector(
    ".doctorThumbSwiper .swiper-wrapper"
  );

  function openDoctorModal(card) {
    const name = card.dataset.name || "";
    const specialty = card.dataset.specialty || "";
    const experience = card.dataset.experience || "";
    const since = card.dataset.since || "";
    const about = card.dataset.about || "";
    const specs = JSON.parse(card.dataset.specs || "[]");
    const photos = JSON.parse(card.dataset.photos || "[]");

    doctorModal.querySelector(".dm-name").textContent = name;
    doctorModal.querySelector(".dm-specialty").textContent = specialty;
    doctorModal.querySelector(".dm-experience").textContent =
      "Стаж работы: " + experience;
    doctorModal.querySelector(".dm-since").textContent =
      "Опыт работы с " + since + " года";
    doctorModal.querySelector(".dm-about").textContent = about;

    const tagsEl = doctorModal.querySelector(".dm-tags");
    tagsEl.innerHTML = specs
      .map((item) => `<span class="dm-tag">${item}</span>`)
      .join("");

    const slidesHtml = photos
      .map(
        (photo) => `
          <div class="swiper-slide">
            <img src="${photo}" alt="${name}">
          </div>
        `
      )
      .join("");

    galleryWrapper.innerHTML = slidesHtml;
    thumbWrapper.innerHTML = slidesHtml;

    doctorModal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (doctorGallerySwiper) {
      doctorGallerySwiper.destroy(true, true);
      doctorGallerySwiper = null;
    }

    if (doctorThumbSwiper) {
      doctorThumbSwiper.destroy(true, true);
      doctorThumbSwiper = null;
    }

    setTimeout(() => {
      doctorThumbSwiper = new Swiper(".doctorThumbSwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 4,
          },
        },
      });

      doctorGallerySwiper = new Swiper(".doctorGallerySwiper", {
        spaceBetween: 10,

        navigation: {
          nextEl: ".doctorGallery__next",
          prevEl: ".doctorGallery__prev",
        },

        thumbs: {
          swiper: doctorThumbSwiper,
        },
      });
    }, 50);
  }

  function closeDoctorModal() {
    doctorModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".doctor-card");

    if (card) {
      openDoctorModal(card);
    }
  });

  doctorModalClose?.addEventListener("click", closeDoctorModal);
  doctorModalOverlay?.addEventListener("click", closeDoctorModal);

  window.closeDoctorModal = closeDoctorModal;
}

/* ── Escape close ── */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (window.closeSlideModal) window.closeSlideModal();
    if (window.closeDoctorModal) window.closeDoctorModal();
  }
});

/* ── Services accordion ── */
document.querySelectorAll(".service-item__header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains("active");

    document.querySelectorAll(".service-item__header.active").forEach((openHeader) => {
      if (openHeader !== header) {
        openHeader.classList.remove("active");
        openHeader.nextElementSibling.style.maxHeight = "";
      }
    });

    if (isActive) {
      header.classList.remove("active");
      content.style.maxHeight = "";
    } else {
      header.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});