import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-our-children',
  templateUrl: './our-children.component.html',
  styleUrls: ['./our-children.component.scss']
})
export class OurChildrenComponent implements OnInit {

  
  constructor() {}
  
  ngOnInit() {
  }

  

  navScrollFunction() {
    let V = 0.9; 
    let w = window.pageYOffset;  
    let t = document.getElementById('router').getBoundingClientRect().top,  
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
  
  
}
