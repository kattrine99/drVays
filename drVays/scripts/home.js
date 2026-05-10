const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navigation.classList.toggle("active");
});
const scrollTopBtn = document.getElementById("scrollTopBtn");
const mainWindow = document.getElementById("main-window");

scrollTopBtn.addEventListener("click", () => {
  mainWindow.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});