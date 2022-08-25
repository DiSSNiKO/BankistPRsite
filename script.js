'use strict';

///////////////////////////////////////
// Modal window

const openBtns = document.querySelectorAll(".openBtn");
const overlay = document.querySelector("#overlay");
const accountCreation = document.querySelector("#accountCreation");
const closeBtn = document.querySelector("#closeModal")

// DOM elements
const body = document.body;

// header
const navHrefs = document.querySelector(".navHrefs");
const header = document.querySelector("header");

//section 2
const section2 = document.querySelector('#section2');
const section2cords = section2.getBoundingClientRect();

//section 3
const section3 = document.querySelector('#section3');
const section3cords = section3.getBoundingClientRect();
const operationButtonsCont = document.querySelector('.operationButtons');
const operationButtons = document.querySelectorAll('.operationsButt');
const operationTexts = document.querySelectorAll('.operationsText');
const operationsDecDiv = document.querySelector('#operationsDecDiv');

//section 4
const section4 = document.querySelector('#section4');
const section4cords = section4.getBoundingClientRect();
const smallBtnCont = document.querySelector("#smallBtnCont");

//Event listeners
const openBtnMethod = () => {
    overlay.style.display = 'block';
    accountCreation.style.display = 'block';
}
const closeBtnMethod = () => {
    overlay.style.display = 'none';
    accountCreation.style.display = 'none';
}

openBtns.forEach((btn) => {
    btn.addEventListener("click",openBtnMethod);
})

closeBtn.addEventListener("click", closeBtnMethod);


//Page navigation
navHrefs.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains("navLink")){
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
        });
    }
});

//operations tabbing

//default tabbery
operationButtons[0].classList.add("moveBtnUp");
operationTexts[0].style.display = "block";
operationTexts[1].style.display = "none";
operationTexts[2].style.display = "none";
operationsDecDiv.style.backgroundColor = '#ffb003';
//


//could've done this with CSS classes but meh dont care :PPPPPPPPPP, switchcase goes brrrr
operationButtonsCont.addEventListener('click', function(e){
    const letarget = e.target;
    operationButtons.forEach(button => button.classList.remove("moveBtnUp"));
    if(letarget.classList.contains("operationsButt")){
        switch(letarget.id) {
            case "instTrans":
                operationButtons[0].classList.add('moveBtnUp');
                operationTexts[0].style.display = 'block';
                operationTexts[1].style.display = 'none';
                operationTexts[2].style.display = 'none';
                operationsDecDiv.style.backgroundColor = '#ffb003';
              break;
            case "instLoans":
                operationButtons[1].classList.add('moveBtnUp');
                operationTexts[0].style.display = 'none';
                operationTexts[1].style.display = 'block';
                operationTexts[2].style.display = 'none';
                operationsDecDiv.style.backgroundColor = '#39b385';
              break;
            case "instClose":
                operationButtons[2].classList.add('moveBtnUp');
                operationTexts[0].style.display = 'none';
                operationTexts[1].style.display = 'none';
                operationTexts[2].style.display = 'block';
                operationsDecDiv.style.backgroundColor = '#ff585f';
              break;
          }
    }
})

//header opacity thingy

navHrefs.addEventListener('mouseover', function(e){
    const letarget = e.target;
    if(letarget.classList.contains("navLink")){
        for(let el of navHrefs.children){
            el.classList.add('navOpacity');
        }
        letarget.classList.remove('navOpacity');
    }
})
header.addEventListener('mouseout', function(){
    for(let el of navHrefs.children){
        el.classList.remove('navOpacity');
    }
})
//sticky nav
const headerHeight = header.getBoundingClientRect().height;

const obsCallback = function(entries){
    if(!entries[0].isIntersecting){
        header.classList.add('stickyHead');
    } else {
        header.classList.remove('stickyHead');
    }
};

const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

//lay-z loading imges

const layzImages = document.querySelectorAll('img[data-src]');
console.log(layzImages);

const layzCallback = function(entries, observer){
    const entry = entries[0];
    if(!entry.isIntersecting){
        return;
    }
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazyImage');
    });
    observer.unobserve(entry.target);
};

const lazyOptions = {
    root: null,
    threshold: 0,
};

const lazyObserver = new IntersectionObserver(layzCallback, lazyOptions);

layzImages.forEach(img => lazyObserver.observe(img));

//slidy slides



let currentSlide=0;

const slidies = document.querySelectorAll(".slideCommentsCont");

let smolbtnhtml = '';



let numOfSlides = slidies.length;
for(let i=0; i<numOfSlides; i++){
    smolbtnhtml+=`<button class="smolbtn" data-slide="${i}"></button>\n`;
}
smallBtnCont.innerHTML=smolbtnhtml;
const scrollLeft = document.querySelector("#scrollLeft");
const scrollRight = document.querySelector("#scrollRight");

slidies.forEach((slide, i) => (  //Second parameter in forEach is the INDEX
    slide.style.transform = `translateX(${100*i}%)`
));


function slideleftnright(){
    let cuindks = 0;
    let i = currentSlide;
    let moves = numOfSlides;
    while(moves>0){
        slidies[cuindks].style.transform = `translateX(${100*-i}%)`;
        i--;
        moves--;
        cuindks++;
    }
};

scrollRight.addEventListener('click', function(){
    if(!(currentSlide+1>numOfSlides-1)){
        currentSlide++;
        slideleftnright();
        activateButton();
    } else {
        currentSlide = 0;
        slideleftnright();
        activateButton();
    }
});
scrollLeft.addEventListener('click', function(){
    if(!(currentSlide-1<0)){
        currentSlide--;
        slideleftnright();
        activateButton();
    } else {
        currentSlide = numOfSlides-1;
        slideleftnright();
        activateButton();
    }
});
// small btns

const smolbtns = document.querySelector("#smallBtnCont");
activateButton(); //edge case when page first loads

function activateButton(){
    for(let but of smolbtns.children){
        but.classList.remove("smolbtnActive");
        if(Number(but.dataset.slide)===currentSlide){
            but.classList.add("smolbtnActive");
        }
    }
}


smolbtns.addEventListener('click', function(e){
    const targetz = e.target;
    if(targetz.classList.contains("smolbtn")){
        currentSlide = Number(targetz.dataset.slide);
        console.log(currentSlide)
        slideleftnright();
        activateButton();
    } else {
        return;
    }
});