document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Handle wrapping
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Optional: Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    const slides2 = document.querySelectorAll('.slide2');
    const prevButton2 = document.querySelector('.prev2');
    const nextButton2 = document.querySelector('.next2');
    let currentSlide2 = 0;

    function showSlide2(index) {
        slides2.forEach(slide2 => slide2.classList.remove('active'));
        
        // Handle wrapping
        if (index >= slides2.length) {
            currentSlide2 = 0;
        } else if (index < 0) {
            currentSlide2 = slides2.length - 1;
        } else {
            currentSlide2 = index;
        }
        
        slides2[currentSlide2].classList.add('active');
    }

    prevButton2.addEventListener('click', () => {
        showSlide2(currentSlide2 - 1);
    });

    nextButton2.addEventListener('click', () => {
        showSlide2(currentSlide2 + 1);
    });

    // Optional: Auto-advance slides every 5 seconds
    setInterval(() => {
        showSlide2(currentSlide2 + 1);
    }, 5000);
});


