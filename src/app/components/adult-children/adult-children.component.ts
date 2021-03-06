import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-adult-children',
  templateUrl: './adult-children.component.html',
  styleUrls: ['./adult-children.component.scss']
})
export class AdultChildrenComponent implements OnInit, OnDestroy {

  childrenFirstAnim = ()=>{this.childrenAnimation('first-child', 'pre-anim-left')};
  childrenSecondAnim = () => {this.childrenAnimation('second-child', 'pre-anim-right')};

  constructor() { }

  ngOnInit() {
    // document.addEventListener('scroll', this.childrenFirstAnim);
    // document.addEventListener('scroll', this.childrenSecondAnim);
  }

  ngOnDestroy() {
    // document.removeEventListener('scroll', this.childrenFirstAnim);
    // document.removeEventListener('scroll', this.childrenSecondAnim);
  }

  isPartiallyVisible(element) {
    let elementBounding = element.getBoundingClientRect();
    let topValue = elementBounding.top;
    let bottomValue = elementBounding.bottom;
    let heightValue = elementBounding.height;
    return ((topValue + heightValue >= 0) && (heightValue + window.innerHeight >= bottomValue));
  }

  childrenAnimation(childElement: string, preAnimClass: string) {   
      const elementDescription = document.querySelectorAll(`#${childElement}>.child-description>p`)[0];
      const element = document.getElementById(childElement);
      if(this.isPartiallyVisible(element)) {
        element.classList.remove(preAnimClass);
        element.classList.add('after-anim');
        setTimeout(()=>{
          elementDescription.classList.remove('pre-anim-bottom');
          elementDescription.classList.add('after-anim');
        }, 800);
      }      
  };

}
