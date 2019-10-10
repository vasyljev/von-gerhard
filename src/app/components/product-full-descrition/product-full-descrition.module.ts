import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductFullDescritionComponent } from './product-full-descrition.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {path: '', component: ProductFullDescritionComponent}
];

@NgModule({
  declarations: [ProductFullDescritionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductFullDescritionModule { }
