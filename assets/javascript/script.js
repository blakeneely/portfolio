$(document).ready(function () {
  const body = document.querySelector('body'),
    // Contact Modal Targets
    contactModal = document.getElementById('contactModal'),
    contactModalBtn = document.getElementById('contactLink'),
    contactCloseBtn = document.getElementsByClassName('contactCloseBtn')[0],
    // Resume Modal targets
    modal = document.getElementById('resumeModal'),
    modalBtn = document.getElementById('resumeLink'),
    closeBtn = document.getElementsByClassName('closeBtn')[0],
    //  Slider targets
    slider = document.querySelector('.projects-slider'),
    slides = Array.from(document.querySelectorAll('.project-slide')),
    leftArrow = document.getElementById('leftArrow'),
    rightArrow = document.getElementById('rightArrow');

  let isDragging = false,
    startPosition = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

  // Setup connection to Firebase
  var firebaseConfig = {
    apiKey: 'AIzaSyCxUCsWBLNy_0bQiExP7IljhAfl8621h7s',
    authDomain: 'portfolio-6f94d.firebaseapp.com',
    databaseURL: 'https://portfolio-6f94d.firebaseio.com',
    projectId: 'portfolio-6f94d',
    storageBucket: '',
    messagingSenderId: '727966976436',
    appId: '1:727966976436:web:360c02fe7738df68e84ae1',
    measurementId: 'G-52VR5LN7XG',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Function to save new contact
  function saveContact() {
    // event.preventDefault();
    let name = $('#name-input').val().trim();
    let email = $('#email-input').val().trim();
    let message = $('#message-input').val().trim();
    if (
      $('#name-input').val() === '' ||
      $('#email-input').val() === '' ||
      $('#message-input').val() === ''
    ) {
      return false;
    } else {
      var newContact = {
        name: name,
        email: email,
        message: message,
      };

      console.log(newContact);
      database.ref().push(newContact);
    }
    $('#name-input').val('');
    $('#email-input').val('');
    $('#message-input').val('');
    closeContactModal();
  }

  // Contact Form Event Listener
  $(document).on('click', '#contact-submit', function () {
    saveContact();
  });

  //   Event listeners for slider
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

  // Event listener for slide pagination
  leftArrow.addEventListener('click', clickLeft);
  rightArrow.addEventListener('click', clickRight);

  //  Disable context menu
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // Function to move slides left when left arrow clicked
  function clickRight() {
    if (currentIndex < slides.length - 1) currentIndex += 1;
    setPositionByIndex();
  }

  // Function to move slides left when right arrow clicked
  function clickLeft() {
    if (currentIndex > 0) currentIndex -= 1;
    setPositionByIndex();
  }

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

  // function to end slider when touching stops
  function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();

    slider.classList.remove('grabbing');
  }

  // function to move slider when touching is moving
  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPosition;
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
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

  // Listen for open click for contact modal
  contactModalBtn.addEventListener('click', openContactModal);

  // Listen for close click for contact modal
  contactCloseBtn.addEventListener('click', closeContactModal);

  // Listen for outside click for contact modal
  window.addEventListener('click', outsideContactClick);

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
  // Function to open Contact Modal
  function openContactModal() {
    contactModal.style.display = 'block';
    body.style.overflow = 'hidden';
  }

  // Function to close contact modal
  function closeContactModal() {
    contactModal.style.display = 'none';
    body.style.overflow = 'visible';
  }

  // Function to close resume modal with outside click
  function outsideContactClick(e) {
    if (e.target == modal) {
      contactModal.style.display = 'none';
    }
  }
});
