"use strict";

let block = document.querySelector('.container__wrapper')
let btn = document.querySelectorAll('.nav__btn');
let img = document.querySelectorAll('.nav__img');
let elem = [document.querySelector('.about-me'), document.querySelector('.works'), document.querySelector('.contact-me')]
let w = 0
let stack = ['', '']

//функция нужная для анимации
let duration = 800

function display(i) {
    for (let item of elem) {
        item.style.opacity = "0"
    };
    setTimeout(
        () => {
            if (stack[1] !== '') {
                i = stack[1];
                console.log(i)
                stack[0] = stack[1];
                stack[1] = '';
            };
        }, duration);
    setTimeout(
        () => {
            for (let item of elem) {
                item.style.display = 'none'
            };
            elem[i].style.display = "block"
            block.style.height = elem[i].offsetHeight + 'px'
            setTimeout(
                () => {
                    console.log(i)
                    elem[i].style.opacity = "1";
                    setTimeout(
                        () => {
                            if (stack[1] !== '') {
                                stack[0] = stack[1];
                                display(stack[1]);
                                stack[1] = '';
                            } else {
                                stack[0] = ''
                            }
                        }, duration);
                }
                , 10);
        }
        , duration + 10);
};

//функция определяющая на какую кнопку нажали
function click() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
            if (stack[0] !== '') {
                stack[1] = i
            } else {
                stack[0] = i
                display(i);
            }

            positionTriangle(btn[i]);
            for (let item of img) {
                item.style.opacity = "0.5"
            }
            img[i].style.opacity = "1"
        };
    };
}


function positionTriangle(element) {
    let triangle = document.querySelector('.header__triangle');
    // triangle.style.transform = 'rotate(0deg)';
    triangle.style.left = `${element.offsetWidth / 2 + element.offsetLeft - 20}px`;
    // triangle.style.top = '-69px';
}


document.addEventListener('DOMContentLoaded', () => {
    click();
    positionTriangle(btn[0])
    block.style.height = elem[0].offsetHeight + 'px';
    img[0].style.opacity = "1";
});

