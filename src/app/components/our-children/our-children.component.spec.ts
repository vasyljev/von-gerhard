import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurChildrenComponent } from './our-children.component';

describe('OurChildrenComponent', () => {
  let component: OurChildrenComponent;
  let fixture: ComponentFixture<OurChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
