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
    this.productsAnimation();
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
    let V = 0.9; 
    let w = window.pageYOffset;  
    let t = document.getElementById('vet-home-products').getBoundingClientRect().top,  
        start = null;
    requestAnimationFrame(step);  
    function step(time) {
      if (start === null) start = time;
        let progress = time - start,
            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
        window.scrollTo(0,r);
        if (r != w + t) {
          requestAnimationFrame(step)
        }
      }
    }

  isPartiallyVisible(element) {
		let elementBounding = element.getBoundingClientRect()
		let topValue = elementBounding.top;
		let bottomValue = elementBounding.bottom;
		let heightValue = elementBounding.height;
		return ((topValue + heightValue >= 0) && (heightValue + window.innerHeight >= bottomValue));
  }
  
  productsAnimation() {
    document.addEventListener('scroll', () => {
      let time = 5;
      const productBlocks = document.getElementsByClassName('vet-home-product-item');
      for(let i = 0; i < productBlocks.length; i++) {
        let product = productBlocks[i];
        if(this.isPartiallyVisible(product)) {
          setTimeout(()=>{
            product.classList.remove('pre-anim-hide');
            product.classList.add('after-anim-show');
          }, time * 100);
          time = time + 2;
        }
        
      }
    })
  }

}
