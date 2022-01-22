

let link = document.querySelectorAll('.offer__menu-link');
let menu = document.querySelectorAll('.main__offer-contents');

for (let i = 0; i < link.length; i++) {

    link[i].addEventListener("click", function () {
        let att = link[i].getAttribute('data-num')

        if (link[i].classList.contains('active')) {
            for (let i = 0; i < menu.length; i++) {
                if (menu[i].classList.contains('active')) {
                    getItems(menu[i])
                }
            }
        }

        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";

        for (let i = 0; i < menu.length; i++) {
            menu[i].classList.remove('active')
        }
        menu[att].classList.add('active')
    });
}

function getItems(item) {
    let items = [...item.children]
    if (item.id === 'Google' && item.classList.contains('active')) {
        item.classList.toggle('active-2')
        if (item.classList.contains('active-2')) {
            items[0].style = `opacity: 0;`;
            items[1].style = `opacity: 0;`;
            items[2].style = `opacity: 1;`;
            items[3].style = `opacity: 1;`;
        }
        if (!item.classList.contains('active-2')) {
            items[0].style = `opacity: 1;`;
            items[1].style = `opacity: 1;`;
            items[2].style = `opacity: 0;`;
            items[3].style = `opacity: 0;`;
        }
    }
    if (item.id === 'Yandex' && item.classList.contains('active')) {
        item.classList.toggle('active-2')
        if (item.classList.contains('active-2')) {
            items[0].style = `opacity: 0;`;
            items[1].style = `opacity: 0;`;
            items[2].style = `opacity: 1;`;
            items[3].style = `opacity: 1;`;
        }
        if (!item.classList.contains('active-2')) {
            items[0].style = `opacity: 1;`;
            items[1].style = `opacity: 1;`;
            items[2].style = `opacity: 0;`;
            items[3].style = `opacity: 0;`;
        }
    }
}

// ----------------------------------------------------------------------------

let burger = document.querySelector('.header__burger');
burger.addEventListener('click', function () {
    burger.classList.toggle('active');
})

// ----------------------------------------------------------------------------

const accordionTriggers = document.querySelectorAll('.accordion__item--trigger');

accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', expandAccordion);
});

function expandAccordion(event) {
    const {
        target: targetElement
    } = event;
    const isPanelExpanded = targetElement.getAttribute('aria-expanded');

    collapseAllAccordions();

    if (isPanelExpanded === "false") {
        targetElement.setAttribute('aria-expanded', true);
    } else {
        targetElement.setAttribute('aria-expanded', false);
    }
}

function collapseAllAccordions() {
    accordionTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', false);
    });
}

// ----------------------------------------------------------------------------


function handleMarquee() {
    const marquee = document.querySelectorAll('.marquee');
    let speed = 1;
    
    marquee.forEach(function (el) {
        const container = el.querySelector('.inner');
        const content = el.querySelector('.inner > *');
        
        let clone = content.cloneNode(true);
        container.appendChild(clone);
        
        
        let progress = 0;
        
        function loop() {
            if (container.classList.contains('left')) {
                progress = progress - speed;
                if (progress === -890) {
                    progress = 0;
                }
            }
            if (container.classList.contains('right')) {
                progress = progress + speed;
                if (progress === 890) {
                    progress = 0;
                }
            }
            
            container.style.transform = `translateX(${progress}px)`;
            window.requestAnimationFrame(loop);
        }
        loop();
    });
    
};
handleMarquee();

// ----------------------------------------------------------------------------

class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        this.sliderSecond = document.querySelector(options.sliderSecond);

        this.sliderLine = document.querySelector('.slider__line');
        this.slides = [...this.sliderLine.children];
        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
        // -----
        this.sliderLineSecond = document.querySelector('.slider__line-second');
        this.slidesSecond = [...this.sliderLineSecond.children];
        this.prevSec = document.querySelector('.prev-second');
        this.nextSec = document.querySelector('.next-second');

        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.timeMove = options.time ?? 1000;
        this.width = this.slider.clientWidth;
        this.height = this.slider.clientHeight;
        // ------
        this.widthSec = this.sliderSecond.clientWidth;
        this.heightSec = this.sliderSecond.clientHeight;

        this.moveSize = this.dir === 'X' ? this.width : this.height;
        // ----
        this.moveSizeSec = this.dir === 'X' ? this.widthSec : this.heightSec;
        this.interval = options.interval ?? 3500

        this.active = 0;

        this.sliderLine.style = `position: relative;
                                 overflow: hidden;`;
        //  --
        this.sliderLineSecond.style = `position: relative;
                                 overflow: hidden;
                                 height: 100%;`;

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            slide.style = `position: absolute;`;
            if (i != this.active) {
                slide.style.transform = `translate${this.dir}(${this.moveSize + 10}px)`;
            }
            if (i === this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSize - 10}px)`;
            }
        }
        // ------
        for (let i = 0; i < this.slidesSecond.length; i++) {
            let slide = this.slidesSecond[i];
            slide.style = `position: absolute;`;
            if (i != this.active) {
                slide.style.transform = `translate${this.dir}(${this.moveSizeSec + 10}px)`;
            }
            if (i === this.slidesSecond.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSizeSec - 10}px)`;
            }
        }

        this.prev.addEventListener('click', () => this.moveF(this.prev));
        this.next.addEventListener('click', () => this.moveF(this.next));
        this.prevSec.addEventListener('click', () => this.moveS(this.prevSec));
        this.nextSec.addEventListener('click', () => this.moveS(this.nextSec));

    }
    moveF(btn) {

        this.disabledF();

        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize;
        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            slide.style.transition = '0ms';
            if (i != this.active) {
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`;
            }
        }

        this.slides[this.active].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        this.slides[this.active].style.transition = this.timeMove + 'ms';

        if (btn == this.next) {
            this.active++
            if (this.active == this.slides.length) {
                this.active = 0
            }
        } else if (btn == this.prev) {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1;
            }
        }

        this.slides[this.active].style.transform = `translate${this.dir}(0px)`;
        this.slides[this.active].style.transition = this.timeMove + 'ms';
    }
    moveS(btn) {

        this.disabledS();

        let btnLeftOrRight = btn == this.nextSec ? this.moveSizeSec * -1 : this.moveSizeSec;
        for (let i = 0; i < this.slidesSecond.length; i++) {
            let slide = this.slidesSecond[i];
            slide.style.transition = '0ms';
            if (i != this.active) {
                slide.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`;
            }
        }

        this.slidesSecond[this.active].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        this.slidesSecond[this.active].style.transition = this.timeMove + 'ms';

        if (btn == this.nextSec) {
            this.active++
            if (this.active == this.slidesSecond.length) {
                this.active = 0
            }
        } else if (btn == this.prevSec) {
            this.active--
            if (this.active < 0) {
                this.active = this.slidesSecond.length - 1;
            }
        }

        this.slidesSecond[this.active].style.transform = `translate${this.dir}(0px)`;
        this.slidesSecond[this.active].style.transition = this.timeMove + 'ms';
    }
    disabledF() {
        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.timeMove + 500)
    }
    disabledS() {
        this.nextSec.disabled = true
        this.prevSec.disabled = true
        setTimeout(() => {
            this.nextSec.disabled = false
            this.prevSec.disabled = false
        }, this.timeMove + 500)
    }
}

let slider = new SLIDER({
    slider: '.slider',
    sliderSecond: '.slider-second',
    direction: 'x',
    time: 1000,
    autoplay: true,
    interval: 3000
}); 
