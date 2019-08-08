import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditProductsComponent } from './admin-add-edit-products.component';

describe('AdminAddEditProductsComponent', () => {
  let component: AdminAddEditProductsComponent;
  let fixture: ComponentFixture<AdminAddEditProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddEditProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddEditProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
