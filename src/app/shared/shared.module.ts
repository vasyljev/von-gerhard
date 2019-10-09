import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';



import { AdminAddEditProductsComponent } from '../components/admin-add-edit-products/admin-add-edit-products.component';
import { SearchComponent } from '../components/search/search.component';
import { ListItemComponent } from '../components/list-item/list-item.component';


@NgModule({
  declarations: [
    AdminAddEditProductsComponent,
    SearchComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AdminAddEditProductsComponent,
    FormsModule,
    SearchComponent,
    ReactiveFormsModule,
    ListItemComponent,
    RouterModule
  ]
})
export class SharedModule { }
