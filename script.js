"use strict";

let btn = document.querySelectorAll('.nav__btn');
let elem = [document.querySelector('.about-me'), document.querySelector('.works'), document.querySelector('.contact-me')]
let w = 0

//функция изменения прозрачности
function opacityChange(elem, from, to) {
    let thisOpacity = from
    let interval = setInterval(() => {
        thisOpacity += (to - from) / 10
        elem.style.opacity = thisOpacity
    }, 10)
    setTimeout(() => clearInterval(interval), 1000)
}

//функция нужная для анимации
function display(i) {
    for (let item of elem) {
        opacityChange(item, 1, 0)
    };
    setTimeout(
        () => {
            for (let item of elem) {
                item.style.display = 'none'
            };
            elem[i].style.display = 'block'
            opacityChange(elem[i], 0, 1)
        }
        , 1000);
}

//функция определяющая на какую кнопку нажали
function click() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => display(i)
    };
}
click()