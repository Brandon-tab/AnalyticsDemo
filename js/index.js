// get dom
const menuIcon = document.getElementById('menuIcon');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const closeBtn = document.getElementById('closeBtn');
document.querySelectorAll('li[data-target]').forEach(li => {
    li.addEventListener('click', function () {//add onclick
        // Hide everything
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });

        // Displays the corresponding content of the click
        const target = this.getAttribute('data-target');
        document.getElementById(target).style.display = 'block';
        fullscreenMenu.classList.remove('active');
    });
});

//menu
// Click the menu icon to display a menu spread across the screen
menuIcon.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
});

// Click the Close button to hide the menu that fills the screen
closeBtn.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
});
//click Sign In
let signIn = document.getElementById("singIn")
if (signIn) {
    signIn.onclick = () => {
        // Hide everything
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        let sign_in = document.getElementById("sign-in");
        sign_in.style.display = "block"
    };

}


//carousel
document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Switches to the carousel entry of the specified index
    function goToItem(index) {
        if (index < 0) {
            index = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            index = 0;
        }
        currentIndex = index;

        // Update the location of the rotation chart
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update index
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Switch to the previous item
    prevButton.addEventListener('click', function () {
        goToItem(currentIndex - 1);
    });

    // Switch to the next item
    nextButton.addEventListener('click', function () {
        goToItem(currentIndex + 1);
    });

    // Subscript jump
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            goToItem(index);
        });
    });

    // Automatic wheel seeding
    setInterval(function () {
        goToItem(currentIndex + 1);
    }, 8000); // Switch every 8 seconds
});

// slider-container
const slider = document.querySelector('.slider');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
// Calculate the pixel value corresponding to 21vw
function getViewportWidthInPixels() {
    return window.innerWidth * 0.23; // 23vw
}
// Click the left button
leftButton.addEventListener('click', () => {
    const scrollDistance = -getViewportWidthInPixels(); // turn left
    slider.scrollBy({
        left: scrollDistance,
        behavior: 'smooth' // smooth
    });
});

// Click the right button
rightButton.addEventListener('click', () => {
    const scrollDistance = getViewportWidthInPixels(); // turn right
    slider.scrollBy({
        left: scrollDistance,
        behavior: 'smooth' // smooth
    });
});



//  Mobile  carousel
const swCarousel = document.querySelector('.sw-carousel');
const swDotsContainer = document.querySelector('.sw-carousel-dots');
const swCarouselItems = document.querySelectorAll('.sw-carousel-item');
let swCurrentIndex = 0;

// init 
swCarouselItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('sw-dot');
    if (index === swCurrentIndex) dot.classList.add('sw-active');
    dot.addEventListener('click', () => {
        swGoToSlide(index);
    });
    swDotsContainer.appendChild(dot);
});

const swDots = document.querySelectorAll('.sw-carousel-dots .sw-dot');

// Switch to the specified slide
function swGoToSlide(index) {
    if (index < 0) {
        index = swCarouselItems.length - 1; // Switch to the last one
    } else if (index >= swCarouselItems.length) {
        index = 0; // Switch to the first one
    }
    swCurrentIndex = index;
    swCarousel.style.transform = `translateX(-${swCurrentIndex * 100}%)`;
    swUpdateDots();
}

// update
function swUpdateDots() {
    swDots.forEach((dot, index) => {
        dot.classList.toggle('sw-active', index === swCurrentIndex);
    });
}

// autoplay
let swAutoPlayInterval;

function swStartAutoPlay() {
    swAutoPlayInterval = setInterval(() => {
        swGoToSlide(swCurrentIndex + 1);
    }, 3000); // 3 s
}

function swStopAutoPlay() {
    clearInterval(swAutoPlayInterval);
}

swStartAutoPlay();

// Touch slide support
let swTouchStartX = 0;
let swTouchEndX = 0;

let isSwiping = false;
// Dynamically calculate thresholds based on screen width (10-15% of screen width recommended)
const SWIPE_THRESHOLD = Math.min(window.innerWidth * 0.15, 120); 

swCarousel.addEventListener('touchstart', (e) => {
    swTouchStartX = e.touches[0].clientX;
    isSwiping = true;
    swStopAutoPlay();
    swCarousel.style.transition = 'none'; // Disable transitions while dragging
}, { passive: true });

swCarousel.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    
    swTouchEndX = e.touches[0].clientX;
    const diff = swTouchStartX - swTouchEndX;
    
    // Follow your fingers in real time
    swCarousel.style.transform = `translateX(calc(-${swCurrentIndex * 100}% + ${-diff}px)`;
}, { passive: true });

swCarousel.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    
    const diff = swTouchStartX - swTouchEndX;
    swCarousel.style.transition = ''; // Restore transition effect
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
            swGoToSlide(swCurrentIndex + 1); // left
        } else {
            swGoToSlide(swCurrentIndex - 1); // right
        }
    } else {
        // If the value does not reach the threshold, the device springs back
        swGoToSlide(swCurrentIndex);
    }
    
    swStartAutoPlay();
});

// Add touch cancellation processing
swCarousel.addEventListener('touchcancel', () => {
    isSwiping = false;
    swCarousel.style.transition = '';
    swGoToSlide(swCurrentIndex);
    swStartAutoPlay();
});


// The mobile side slides the card
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.mc-slider');
    const track = document.querySelector('.mc-slider-track');
    const slides = document.querySelectorAll('.mc-slide');
    const dotsContainer = document.querySelector('.mc-slider-dots');
    const prevBtn = document.querySelector('.mc-prev-btn');
    const nextBtn = document.querySelector('.mc-next-btn');
    
    let currentIndex = 0;
    let startX = 0;
    let moveX = 0;
    let isDragging = false;
    
    // create index
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('mc-dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.mc-dot');
    
    // Update the slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update pointer status
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button status
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }
    
    // Jump to the specified slide
    function goToSlide(index) {
        if(index < 0 || index >= slides.length) return;
        currentIndex = index;
        updateSlider();
    }
    
    // prev
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    // next
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // touchstart
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    }, { passive: true }); //Using passive mode to improve scrolling performance
    
    slider.addEventListener('touchmove', (e) => {
        if(!isDragging) return;
        moveX = e.touches[0].clientX;
        const diff = moveX - startX-300;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
    }, { passive: true });
    
    slider.addEventListener('touchend', () => {
        if(!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.3s ease';
        
        const diff = moveX - startX;
        if(diff > 50 && currentIndex > 0) {
            // Swipe right. Previous one
            goToSlide(currentIndex - 1);
        } else if(diff < -50 && currentIndex < slides.length - 1) {
            // Swipe left. Next one
            goToSlide(currentIndex + 1);
        } else {
            // Return to one's place
            updateSlider();
        }
    }, { passive: true });
    
    // Mouse event handling (for testing in desktop browsers)）
    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startX = e.clientX;
        isDragging = true;
        track.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        moveX = e.clientX;
        const diff = moveX - startX;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px))`;
    });
    
    document.addEventListener('mouseup', () => {
        if(!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.9s ease';
        
        const diff = moveX - startX;
        if(diff > 50 && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if(diff < -50 && currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            updateSlider();
        }
    });
});