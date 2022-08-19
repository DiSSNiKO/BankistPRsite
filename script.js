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