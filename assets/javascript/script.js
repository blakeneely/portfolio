const body = document.querySelector('body'),
  modal = document.getElementById('resumeModal'),
  modalBtn = document.getElementById('resumeLink'),
  closeBtn = document.getElementsByClassName('closeBtn')[0],
  slider = document.querySelector('.projects-slider'),
  slides = Array.from(document.querySelectorAll('.project-slide'));

let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events for slider
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // Mouse events for slider
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

//   Disable context menu
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

// function to move slider when touching starts
function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPosition = getPositionX(event);
    isDragging = true;

    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  };
}

// function to end slider whn touching stops
function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

// function to move slider whn touching is moving
function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Listen for open click for modal
modalBtn.addEventListener('click', openModal);

// Listen for close click for modal
closeBtn.addEventListener('click', closeModal);

// Listen for outside click for modal
window.addEventListener('click', outsideClick);

// Function to open resume modal
function openModal() {
  modal.style.display = 'block';
  body.style.overflow = 'hidden';
}

// Function to close resume modal
function closeModal() {
  modal.style.display = 'none';
  body.style.overflow = 'visible';
}

// Function to close resume modal with outside click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
