document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const header = document.querySelector('.image-520-parent');
    const program = document.querySelector('.program-list');
    header.style.position = 'fixed'; // Make it fixed relative to viewport
    header.style.top = '10px'; // Set initial position
    
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) { // Only hide after scrolling down 100px
        // Scrolling down
        
        if (program.classList.contains('active')) {
          header.style.top = '-400px';
        } else {
          header.style.top = '-150px';
        }
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        header.style.top = '0px'; // Visible with margin
      }
      
      lastScrollTop = scrollTop;
    });    

    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.program-list');
  
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  
      });