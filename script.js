const slider = document.querySelector(".slider-mob");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".icon-dot");
const cardsContainer = document.querySelector(".cards");
const cards = Array.from(document.querySelectorAll(".card"));
const btnPlayerPrev = document.querySelector(".player-prev");
const btnPlayerNext = document.querySelector(".player-next");
const sliderIcon = document.getElementById("slider-icon");

let currentIndex = 0;

prevBtn.classList.add("disabled");

// Функция для отображения текущего слайда
function showSlide() {
  slides.forEach((slide, index) => {
    slide.style.display = "none";
  });
  slides[currentIndex].style.display = "block";
}

// Функция для отображения текущей точки навигации
function showDot() {
  dots.forEach((dot, index) => {
    dot.style.fill = "#D9D9D9";
  });
  dots[currentIndex].style.fill = "#333";
}

// Функция для навигации по слайдам
function navigateSlides() {
  showSlide();
  showDot();
}

// Событие клика на кнопку "Предыдущий"
prevBtn.addEventListener("click", () => {
  if (!prevBtn.classList.contains("disabled")) {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 1;
    }
    navigateSlides();

    if (currentIndex > 0) {
      prevBtn.classList.remove("disabled");
    }
    if (currentIndex < slides.length - 1) {
      nextBtn.classList.remove("disabled");
    }
    if (currentIndex === 0) {
      prevBtn.classList.add("disabled");
    }
  }
});

nextBtn.addEventListener("click", () => {
  if (!nextBtn.classList.contains("disabled")) {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      prevBtn.classList.remove("disabled");
    } else {
      currentIndex = 0;
    }
    navigateSlides();
    if (currentIndex === slides.length - 1) {
      nextBtn.classList.add("disabled");
    }
    if (currentIndex > 0) {
      prevBtn.classList.remove("disabled");
    }

    if (currentIndex === 0) {
      prevBtn.classList.add("disabled");
    }
  }
});

showSlide();
showDot();

let currentIndexPlayer = 0;
let cardsPerPage = 3;
let intervalId = null;
if (window.matchMedia("(max-width: 883px)").matches) {
  cardsPerPage = 1;
}
function updateCardsPerPage() {
  if (window.matchMedia("(max-width: 883px)").matches) {
    cardsPerPage = 1;
  } else {
    cardsPerPage = 3;
  }
}
// Функция для навигации по слайдам
function navigateSlides() {
  const start = currentIndexPlayer * cardsPerPage;
  const end = start + cardsPerPage;
  const visibleCards = cards.slice(start, end);

  cards.forEach((card) => (card.style.display = "none"));
  visibleCards.forEach((card) => (card.style.display = "flex"));

  updateSliderIcon();
}

// Функция для обновления иконки слайдера
function updateSliderIcon() {
  const totalPages = Math.ceil(cards.length);
  if (window.matchMedia("(max-width: 883px)").matches) {
    sliderIcon.textContent = `${currentIndexPlayer + 1}/${totalPages}`;
  } else {
    sliderIcon.textContent = `${(currentIndexPlayer + 1) * 3}/${totalPages}`;
  }
}

btnPlayerPrev.addEventListener("click", () => {
  clearInterval(intervalId);
  currentIndexPlayer =
    (currentIndexPlayer - 1 + cards.length / cardsPerPage) %
    (cards.length / cardsPerPage);
  navigateSlides();
  startInterval();
});

btnPlayerNext.addEventListener("click", () => {
  clearInterval(intervalId);
  currentIndexPlayer = (currentIndexPlayer + 1) % (cards.length / cardsPerPage);
  navigateSlides();
  startInterval();
});

// Функция для запуска слайдера
function startInterval() {
  intervalId = setInterval(() => {
    if (currentIndexPlayer < cards.length / cardsPerPage - 1) {
      currentIndexPlayer++;
    } else {
      currentIndexPlayer = 0;
    }
    navigateSlides();
  }, 4000);
}

updateCardsPerPage();
navigateSlides();
startInterval();
window.addEventListener("resize", updateCardsPerPage);
