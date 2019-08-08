import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFullDescritionComponent } from './product-full-descrition.component';

describe('ProductFullDescritionComponent', () => {
  let component: ProductFullDescritionComponent;
  let fixture: ComponentFixture<ProductFullDescritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFullDescritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFullDescritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
