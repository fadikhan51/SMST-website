document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const dots = Array.from(document.querySelectorAll('.gallery-dot'));
    const counter = document.querySelector('.gallery-counter');
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0; 
    const totalSlides = items.length;
    
    // Initialize
    function init() {
      // Set initial position to center the first slide
      const slideWidth = items[0].offsetWidth;
      const containerWidth = track.parentElement.offsetWidth;
      const initialOffset = (containerWidth / 2) - (slideWidth / 2);
      
      prevTranslate = initialOffset;
      currentTranslate = initialOffset;
      
      setPositionByIndex();
      
      items.forEach((item, index) => {
        // Disable image drag
        item.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault());
        
        // Touch events
        item.addEventListener('touchstart', touchStart(index));
        item.addEventListener('touchend', touchEnd);
        item.addEventListener('touchmove', touchMove);
        
        // Mouse events
        item.addEventListener('mousedown', touchStart(index));
        item.addEventListener('mouseup', touchEnd);
        item.addEventListener('mouseleave', touchEnd);
        item.addEventListener('mousemove', touchMove);
      });
      
      // Window resize event
      window.addEventListener('resize', setPositionByIndex);
      
      // Nav click events
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentIndex = index;
          setPositionByIndex();
        });
      });
      
      updateActiveClass();
      updateCounter();
    }
    
    function touchStart(index) {
      return function(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.classList.add('is-dragging');
      }
    }
    
    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      track.classList.remove('is-dragging');
      
      const threshold = 100;
      const movedBy = currentTranslate - prevTranslate;
      
      // If dragged enough negative (right to left) and not on the last slide
      if (movedBy < -threshold && currentIndex < items.length - 1) {
        currentIndex += 1;
      }
      
      // If dragged enough positive (left to right) and not on the first slide
      if (movedBy > threshold && currentIndex > 0) {
        currentIndex -= 1;
      }
      
      setPositionByIndex();
    }
    
    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
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
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function setPositionByIndex() {
      const slideWidth = items[0].offsetWidth + 30; // width + margins
      const containerWidth = track.parentElement.offsetWidth;
      const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
      
      currentTranslate = offset;
      prevTranslate = offset;
      
      setSliderPosition();
      updateActiveClass();
      updateCounter();
    }
    
    function updateActiveClass() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === currentIndex);
      });
    }
    
    function updateCounter() {
      counter.textContent = `DRAG - ${currentIndex + 1}/${totalSlides}`;
    }
    
    init();
  });