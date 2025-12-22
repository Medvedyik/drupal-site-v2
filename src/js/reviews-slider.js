// Reviews Slider - Infinite Version
function initInfiniteReviewsSlider() {
  const cards = document.querySelectorAll('.review-card');
  const totalCards = cards.length;
  let currentIndex = 0;
  
  // Находим элементы навигации
  const prevButtons = document.querySelectorAll('[data-direction="prev"]');
  const nextButtons = document.querySelectorAll('[data-direction="next"]');
  
  // Функция для обновления видимых карточек
  function updateVisibleCards() {
    cards.forEach((card, index) => {
      // Убираем все классы
      card.classList.remove(
        'review-card--active',
        'review-card--prev',
        'review-card--next'
      );
      
      // Вычисляем индексы для предыдущей и следующей карточек (бесконечный цикл)
      const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
      const nextIndex = (currentIndex + 1) % totalCards;
      
      // Присваиваем классы
      if (index === currentIndex) {
        card.classList.add('review-card--active');
      } else if (index === prevIndex) {
        card.classList.add('review-card--prev');
      } else if (index === nextIndex) {
        card.classList.add('review-card--next');
      }
    });
    
    // Обновляем счетчики
    updateCounters();
  }
  
  // Функция для обновления счетчиков
  function updateCounters() {
    const formatIndex = (index) => String(index + 1).padStart(2, '0');
    
    // Обновляем счетчики на всех видимых карточках
    cards.forEach((card, index) => {
      const counter = card.querySelector('.review-card__counter');
      if (counter && card.classList.contains('review-card--active')) {
        counter.textContent = `${formatIndex(currentIndex)} / ${formatIndex(totalCards - 1)}`;
      }
    });
    
    // Обновляем мобильный счетчик
    const mobileCounter = document.querySelector('.review-card__mobile-counter');
    if (mobileCounter) {
      mobileCounter.textContent = `${formatIndex(currentIndex)} / ${formatIndex(totalCards - 1)}`;
    }
  }
  
  // Функция для перехода к следующей карточке (бесконечный)
  function goToNext() {
    // Увеличиваем индекс с зацикливанием
    currentIndex = (currentIndex + 1) % totalCards;
    updateVisibleCards();
  }
  
  // Функция для перехода к предыдущей карточке (бесконечный)
  function goToPrev() {
    // Уменьшаем индекс с зацикливанием
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateVisibleCards();
  }
  
  // Инициализация
  updateVisibleCards();
  
  // Обработчики событий для стрелок
  prevButtons.forEach(button => {
    button.addEventListener('click', goToPrev);
  });
  
  nextButtons.forEach(button => {
    button.addEventListener('click', goToNext);
  });
  
  // Добавляем обработчики для клавиатуры
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  });
  
  // Автоматическое перелистывание (бесконечное)
  let autoSlideInterval;
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToNext();
    }, 5000); // Меняем каждые 5 секунд
  }
  
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }
  
  // Стартуем автоматическое перелистывание
  startAutoSlide();
  
  // Останавливаем при наведении на слайдер
  const slider = document.querySelector('.reviews__slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Обновляем состояние кнопок при каждом изменении
  function updateButtonStates() {
    // Для бесконечного слайдера кнопки никогда не отключаем
    // Но можно добавить эффект при достижении крайних позиций
    const formatIndex = (index) => String(index + 1).padStart(2, '0');
    
    // Обновляем счетчики с анимацией
    const activeCounter = document.querySelector('.review-card--active .review-card__counter');
    if (activeCounter) {
      activeCounter.style.opacity = '0';
      setTimeout(() => {
        activeCounter.textContent = `${formatIndex(currentIndex)} / ${formatIndex(totalCards - 1)}`;
        activeCounter.style.opacity = '1';
      }, 150);
    }
  }
  
  // Переопределяем функции для обновления кнопок
  const originalGoToNext = goToNext;
  goToNext = function() {
    originalGoToNext();
    updateButtonStates();
  };
  
  const originalGoToPrev = goToPrev;
  goToPrev = function() {
    originalGoToPrev();
    updateButtonStates();
  };
}

// Инициализируем слайдер после загрузки DOM
document.addEventListener('DOMContentLoaded', initInfiniteReviewsSlider);