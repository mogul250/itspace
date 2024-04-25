const slideShowContainer = document.querySelector('.slideShow');
            const slidesContainer = document.querySelector('.slidesContainer');
            const rightBtn = document.querySelector('#slideRight');
            const leftBtn = document.querySelector('#slideLeft');
            let dotscont = document.querySelector('div.dots-cont')
            const slideShowInterval = 6000;
            let slides = document.querySelectorAll('.slideCard');
            let index = 0;
            let currentSlide;
            let dots = Array.from(dotscont.querySelectorAll('div.dot'))
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
            dotscont.innerHTML = null
            slides.forEach(sl=>{
              dotscont.innerHTML+=`<div class="dot w-10p h-10p br-50 b-1-s-dgray m-5p hover"></div>`
            })
            firstClone.id = 'firstClone'
            lastClone.id = 'lastClone'

            slidesContainer.append(firstClone);
            slidesContainer.prepend(lastClone);
            var slideWidth = slides[index].clientWidth+4.5;
            window.addEventListener('resize',()=>{
                slideWidth = slides[index].clientWidth+4.5;
            })

            slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
// -------------------- //


// ----- clone swap ----- // 
const slideCollection = () => document.querySelectorAll('.slideCard');

slidesContainer.addEventListener('transitionend', () => {
  slides = slideCollection();
  if (slides[index].id === firstClone.id) {
    index = 1;
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
  }
  slides = slideCollection();
  if (slides[index].id === lastClone.id) {
    index = slides.length - 2;
    slidesContainer.style.transition = 'none';
    slidesContainer.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
  }
});
// -------------------- //


// ----- nav buttons ----- //
const moveRight = () => {
  slides = slideCollection();
  if (index >= slides.length - 1) return;
  index++;
  slidesContainer.style.transition = 'transform 0.6s ease-in-out';
  slidesContainer.style.transform = 'translateX(' + ((-slideWidth * index)) + 'px)';
}

const moveLeft = () => {
  slides = slideCollection();
  if (index <= 0) return;
  index--;
  slidesContainer.style.transition = 'transform 0.6s ease-in-out';
  slidesContainer.style.transform = 'translateX(' + ((-slideWidth * index)) + 'px)';
  
}

rightBtn.addEventListener('click', moveRight);
leftBtn.addEventListener('click', moveLeft);
// -------------------- //


// ----- selection dots ----- //
const selectDotsGroup = () => document.querySelector('slideNumberDots');
const slideSelect = () => document.querySelectorAll('.slideDot');

// const setCurrentSlide = (slideDots) => {
//   slideDots = slideSelect();
//   slideDots[index - 1].classList.add('selectedSlide');
// };

// -------------------- //


// ----- slide autoplay ----- //
dots = Array.from(dotscont.querySelectorAll('div.dot'))
const autoplay = () => {
  currentSlide = setInterval(() => {
    moveRight();
    dots.forEach(dot=>{

      dot.classList.remove('bc-dgray')
    })
    try {
      dots[index-1].classList.add('bc-dgray')
    } catch (error) {
      
    }
    
  }, slideShowInterval);
}

slidesContainer.addEventListener('mouseenter', () => {
  clearInterval(currentSlide);
})

slidesContainer.addEventListener('mouseleave', autoplay);

autoplay();
// -------------------- //



