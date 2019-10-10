import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminGuard } from '../../admin.guard';


const routes: Routes = [
  {path: '', component: OrdersComponent, canActivate: [AdminGuard]}
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
