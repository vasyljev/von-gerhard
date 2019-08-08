import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public slideOneVisability: boolean = false;
  public slideTwoVisability: boolean = false;
  public slideThreeVisability: boolean = false;
  public slideShowValue: boolean;

  ngOnInit() {
    this.slideShowValue = true;
    this.changeVisabilityOfSlides(this.slideShowValue);
    this.navScrollFunction();
  }

  ngOnDestroy() {
    this.slideShowValue = false;
  }

  changeVisabilityOfSlides(showValue: boolean) { 
    if(showValue)  {
      setTimeout(() => {
        this.slideThreeVisability = false;
        this.slideOneVisability = true;
      }, 0);
      setTimeout(() => {
        this.slideOneVisability = false;
        this.slideTwoVisability = true;
      }, 6000);
      setTimeout(() => {
        this.slideTwoVisability = false;
        this.slideThreeVisability = true;
      }, 12000);
      setTimeout(() => {
        this.changeVisabilityOfSlides(this.slideShowValue);
      }, 18000);
    } else {
      
    }
      
  }

  navScrollFunction() {
    let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
         V = 0.8;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    for (var i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      let w = window.pageYOffset,  // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
      let t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
      requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
      function step(time) {
        if (start === null) start = time;
          let progress = time - start,
              r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
          window.scrollTo(0,r);
          if (r != w + t) {
            requestAnimationFrame(step)
          } else {
            location.hash = hash  // URL с хэшем
          }
        }
    }, false);
      }
  }
}
