import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallChildrenComponent } from './small-children.component';

describe('SmallChildrenComponent', () => {
  let component: SmallChildrenComponent;
  let fixture: ComponentFixture<SmallChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
