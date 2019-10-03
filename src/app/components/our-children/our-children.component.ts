import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-our-children',
  templateUrl: './our-children.component.html',
  styleUrls: ['./our-children.component.scss']
})
export class OurChildrenComponent implements OnInit {

  
  constructor() {}
  
  ngOnInit() {    
   this.navScrollFunction() ;
  }

  

  navScrollFunction() {
    let linkNav = document.querySelectorAll('[href^="#"]'),
         V = 0.9; 
    for (var i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener('click', function(e) {
      e.preventDefault();
      let w = window.pageYOffset,  
        hash = this.href.replace(/[^#]*(.*)/, '$1');  
      let t = document.querySelector(hash).getBoundingClientRect().top,  
            start = null;
      requestAnimationFrame(step);  
      function step(time) {
        if (start === null) start = time;
          let progress = time - start,
              r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
          window.scrollTo(0,r);
          if (r != w + t) {
            requestAnimationFrame(step)
          } else {
            location.hash = hash  
          }
        }
    }, false);
      }
  }
  
}
