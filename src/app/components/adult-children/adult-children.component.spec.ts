import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultChildrenComponent } from './adult-children.component';

describe('AdultChildrenComponent', () => {
  let component: AdultChildrenComponent;
  let fixture: ComponentFixture<AdultChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
