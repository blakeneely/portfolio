const modal = document.getElementById('resumeModal'),
  modalBtn = document.getElementById('resumeLink'),
  closeBtn = document.getElementsByClassName('closeBtn')[0],
  slider = document.querySelector('.projects-slider'),
  slides = Array.from(document.querySelectorAll('.project.slide'));

let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

// Listen for open click
modalBtn.addEventListener('click', openModal);

// Listen for close click
closeBtn.addEventListener('click', closeModal);

// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open resume modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close resume modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to close resume modal with outside click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
