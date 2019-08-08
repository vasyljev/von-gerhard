import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { VetProductsItem } from '../../models/vetProductsItem';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-product-full-descrition',
  templateUrl: './product-full-descrition.component.html',
  styleUrls: ['./product-full-descrition.component.scss']
})
export class ProductFullDescritionComponent implements OnInit, DoCheck {
  
  productID: string;
  product: VetProductsItem;
  basketStatus: boolean;

  constructor(private activetedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private location: Location) { 
    this.productID = activetedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getProductInfo();
  }

  ngDoCheck() {
    this.basketStatus = this.localStorageService.checkProductInBasket(this.product);
  }

  getProductInfo() {
    let productsMeds: VetProductsItem[]  = this.localStorageService.getProductsList('meds');
    let productsFeed: VetProductsItem[] = this.localStorageService.getProductsList('feed');
    let productsAmmo: VetProductsItem[] = this.localStorageService.getProductsList('ammo');
    let products : VetProductsItem[] = [...productsMeds, ...productsFeed, ...productsAmmo];
    console.log('products', products);
    this.product = products.filter((item) => {
      return item.id === this.productID;
    })[0];
  }

  addOrDeleteProductFromBasket(product: VetProductsItem) {
    let status = this.localStorageService.checkProductInBasket(product);
    if(status){
      this.localStorageService.deleteItemFromBasket(product);
    } else {
      this.addProductToBasket(product);
    }  
  }

  addProductToBasket(product: VetProductsItem) {
    this.localStorageService.addItemToBasket(product);
  }

  goBack() {
    this.location.back();
  }

}
