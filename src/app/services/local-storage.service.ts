import { Injectable } from '@angular/core';

import { VetProductsItem } from '../models/vetProductsItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  initiateLocalStorage() {
    let startObject = {
        'loginState': false,
        'products': {
          'meds' : [],
          'feed' : [],
          'ammo' : []
        },
        'basket': [],
        'orders':[]
    }
    let strStartObject = JSON.stringify(startObject);
    sessionStorage.setItem('vitalic-vet', strStartObject);
  }

  getLocalStorageVetObject() {
    let localStorageStatus = this.setLocalStorageStatus();
    if(!localStorageStatus) {
      this.initiateLocalStorage();
    }
    return JSON.parse(sessionStorage.getItem('vitalic-vet'));
  }

  setLocalStorageStatus() {
    return sessionStorage.getItem('vitalic-vet') ? true : false;
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  LOGIN  /////////////////////////////////////////////////

  getLoginStatus() {
    let localStorageObject = JSON.parse(sessionStorage.getItem('vitalic-vet'));
    if(localStorageObject) {
      return localStorageObject['loginState'] ? true : false;
    } else {
      return false;
    }
  }

  setLoginSuccess() {
    let localStorageObject = this.getLocalStorageVetObject();
    if(!localStorageObject.loginState) {
      localStorageObject.loginState = true;
      sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));  
    }      
  }

  logOut() {
    let localStorageObject = this.getLocalStorageVetObject();    
    localStorageObject.loginState = false;
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  PRODUCTS  ///////////////////////////////////////////////

  setProductsList(products: VetProductsItem[], type: string) {
    let localStorageObject = this.getLocalStorageVetObject();
    localStorageObject.products[`${type}`] = products;
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  getProductsList(type: string) {
    let localStorageObject = this.getLocalStorageVetObject();
    return localStorageObject.products[`${type}`];
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  BASKET  /////////////////////////////////////////////////

  getBasketList() {
    let localStorageObject = this.getLocalStorageVetObject();
    return localStorageObject.basket;
  }

  addItemToBasket(item: VetProductsItem) {
    let localStorageObject = this.getLocalStorageVetObject();
    localStorageObject.basket.push(item);
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  deleteItemFromBasket(item: VetProductsItem) {
    let localStorageObject = this.getLocalStorageVetObject();
    localStorageObject.basket = localStorageObject.basket.filter(i => {
      return i.id !== item.id
    });
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  clearBasket() {
    let localStorageObject = this.getLocalStorageVetObject();
    localStorageObject.basket = [];
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  getBasketCount() {
    let basket = this.getBasketList();
    return basket.length;
  }

  checkProductInBasket(item: VetProductsItem) {
    let {basket} = this.getLocalStorageVetObject();
    let checkresult = basket.find(i => i.id === item.id);
    return !!checkresult;
  }

  changeItemCount(id: string, count: number) {
    let localStorageObject = this.getLocalStorageVetObject();
    let basket = localStorageObject.basket.map(item => {
      if(item.id === id) {
        item.count = count;
      }
      return item;
    });
    localStorageObject.basket = basket;
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  setOrderList(list: Order[]) {
    let localStorageObject = this.getLocalStorageVetObject();
    localStorageObject.orders = list;
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }

  getOrderList() {
    let {orders} = this.getLocalStorageVetObject();    
    return orders;
  }

  deleteOrderItem(item: Order) {
    let localStorageObject = this.getLocalStorageVetObject();
    let newOrder = localStorageObject.orders.filter(({id}) => id !== item.id);
    localStorageObject.orders = newOrder;
    sessionStorage.setItem('vitalic-vet', JSON.stringify(localStorageObject));
  }



}
