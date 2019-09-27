import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-children',
  templateUrl: './our-children.component.html',
  styleUrls: ['./our-children.component.scss']
})
export class OurChildrenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.childrenAnimation('first-child', 'pre-anim-left');
    this.childrenAnimation('second-child', 'pre-anim-right');
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
    document.addEventListener('scroll', () => {
      const element = document.getElementById(childElement);
      if(this.isPartiallyVisible(element)) {
        element.classList.remove(preAnimClass);
        element.classList.add('after-anim');
        setTimeout(()=>{
          elementDescription.classList.remove('pre-anim-bottom');
          elementDescription.classList.add('after-anim');
        }, 800);
      }      
    });
  }
}
