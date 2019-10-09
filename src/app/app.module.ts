import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MedsComponent } from './components/meds/meds.component';
import { FeedComponent } from './components/feed/feed.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { DataBaseService } from './services/data-base.service';
import { LoginService } from './services/login.service';
import { LocalStorageService } from './services/local-storage.service';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminAddEditProductsComponent } from './components/admin-add-edit-products/admin-add-edit-products.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductFullDescritionComponent } from './components/product-full-descrition/product-full-descrition.component';
import { BasketComponent } from './components/basket/basket.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchComponent } from './components/search/search.component';
import { AmmoComponent } from './components/ammo/ammo.component';
import { OurChildrenComponent } from './components/our-children/our-children.component';
import { AdultChildrenComponent } from './components/adult-children/adult-children.component';
import { SmallChildrenComponent } from './components/small-children/small-children.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // MedsComponent,
    // FeedComponent,
    // ListItemComponent,
    NavigationComponent,
    // AdminAddEditProductsComponent,
    LoginFormComponent,
    ProductFullDescritionComponent,
    BasketComponent,
    OrdersComponent,
    // SearchComponent,
    // AmmoComponent,
    OurChildrenComponent,
    AdultChildrenComponent,
    SmallChildrenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'vitalic-vet'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [ 
    DataBaseService,
    LoginService,
    LocalStorageService,
    AngularFireModule,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
