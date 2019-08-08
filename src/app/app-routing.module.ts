import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component'; 
import { FeedComponent } from './components/feed/feed.component';
import { MedsComponent } from './components/meds/meds.component';
import { AmmoComponent } from './components/ammo/ammo.component';
import { OurChildrenComponent } from './components/our-children/our-children.component';
import {ProductFullDescritionComponent} from './components/product-full-descrition/product-full-descrition.component';
import {BasketComponent} from './components/basket/basket.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'meds', component: MedsComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'ammo', component: AmmoComponent},
  {path: 'children', component: OurChildrenComponent},
  {path: 'full-info/:id', component: ProductFullDescritionComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
