import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component'; 
import { FeedComponent } from './components/feed/feed.component';
import { MedsComponent } from './components/meds/meds.component';
import { AmmoComponent } from './components/ammo/ammo.component';
import { OurChildrenComponent } from './components/our-children/our-children.component';
import { AdultChildrenComponent } from './components/adult-children/adult-children.component';
import { SmallChildrenComponent } from './components/small-children/small-children.component';
import {ProductFullDescritionComponent} from './components/product-full-descrition/product-full-descrition.component';
import {BasketComponent} from './components/basket/basket.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminGuard } from './admin.guard';



const childrenRoutes: Routes =[
  {path: 'adult', component: AdultChildrenComponent},
  {path: 'puppies', component: SmallChildrenComponent}
];

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'meds', loadChildren: './components/meds/meds.module#MedsModule'},
  {path: 'feed', loadChildren: './components/feed/feed.module#FeedModule'},
  {path: 'ammo', loadChildren: './components/ammo/ammo.module#AmmoModule'},
  {path: 'children', component: OurChildrenComponent, children: childrenRoutes},  
  {path: 'full-info/:id', component: ProductFullDescritionComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AdminGuard]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
