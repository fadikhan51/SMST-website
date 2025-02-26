document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.card-slider');
    const slides = Array.from(document.querySelectorAll('.card-slide'));
    const navItems = Array.from(document.querySelectorAll('.card-slider-nav-item'));
    
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 1; // Start with middle slide active
    
    // Initialize
    function init() {
      // Set initial position to center the middle slide
      const slideWidth = slides[0].offsetWidth;
      const containerWidth = slider.parentElement.offsetWidth;
      const initialOffset = (containerWidth / 2) - (slideWidth / 2) - (slideWidth + 30); // 30 = 15px margin * 2
      
      prevTranslate = initialOffset;
      currentTranslate = initialOffset;
      
      setPositionByIndex();
      
      slides.forEach((slide, index) => {
        // Disable image drag
        slide.querySelector('img').addEventListener('dragstart', (e) => e.preventDefault());
        
        // Touch events
        slide.addEventListener('touchstart', touchStart(index));
        slide.addEventListener('touchend', touchEnd);
        slide.addEventListener('touchmove', touchMove);
        
        // Mouse events
        slide.addEventListener('mousedown', touchStart(index));
        slide.addEventListener('mouseup', touchEnd);
        slide.addEventListener('mouseleave', touchEnd);
        slide.addEventListener('mousemove', touchMove);
      });
      
      // Window resize event
      window.addEventListener('resize', setPositionByIndex);
      
      // Nav click events
      navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          currentIndex = index;
          setPositionByIndex();
        });
      });
      
      updateActiveClass();
    }
    
    function touchStart(index) {
      return function(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slider.classList.add('card-grabbing');
      }
    }
    
    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      slider.classList.remove('card-grabbing');
      
      const threshold = 100;
      const movedBy = currentTranslate - prevTranslate;
      
      // If dragged enough negative (right to left) and not on the last slide
      if (movedBy < -threshold && currentIndex < slides.length - 1) {
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
      slider.style.transform = `translateX(${currentTranslate}px)`;
      
      // Calculate which slide should be active
      const slideWidth = slides[0].offsetWidth + 30; // width + margins
      const offset = prevTranslate - currentTranslate;
      const tempIndex = currentIndex - (offset / slideWidth);
      
      slides.forEach((slide, index) => {
        const distance = Math.abs(index - tempIndex);
        const scale = 1.1 - (distance * 0.3);
        const blur = distance * 3;
        slide.style.transform = `scale(${Math.max(0.8, scale)})`;
        slide.style.filter = `blur(${Math.min(3, blur)}px)`;
        slide.classList.toggle('card-active', index === Math.round(tempIndex));
      });
    }
    
    function setPositionByIndex() {
      const slideWidth = slides[0].offsetWidth + 30; // width + margins (reduced from 60 to 30)
      const containerWidth = slider.parentElement.offsetWidth;
      const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
      
      currentTranslate = offset;
      prevTranslate = offset;
      
      setSliderPosition();
      updateActiveClass();
    }
    
    function updateActiveClass() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('card-active', index === currentIndex);
        navItems[index].classList.toggle('card-active', index === currentIndex);
      });
    }
    
    init();
  });