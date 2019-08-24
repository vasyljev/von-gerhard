import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { VetProductsItem } from '../../models/vetProductsItem';
import { LocalStorageService } from '../../services/local-storage.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, DoCheck {

  constructor(private localStorageService: LocalStorageService,
              private dataBaseService: DataBaseService,
              private router: Router) { }

  basketList: VetProductsItem[];
  orderSum: number;
  modalWindowVis: boolean = false;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
  userEmail: string;
  userNovaPoshta: string;
  itemCountChangeStatus: boolean;


  ngOnInit() {
    this.basketList = this.localStorageService.getBasketList();
    this.orderSum = this.getOrderSum();
  }

  ngDoCheck() {
    if(this.basketList.length != this.localStorageService.getBasketList().length || this.itemCountChangeStatus === true) {
      this.basketList = this.localStorageService.getBasketList();
      this.orderSum = this.getOrderSum();
      this.itemCountChangeStatus = false;
    }
    
  }

  getOrderSum() {
    let sum = this.basketList.reduce((sumPrice, {price, count}) => {
      return +sumPrice + (+price * +count);
    }, 0)
    return sum;
  }

  deleteItemFromBasket(item: VetProductsItem) {
    this.localStorageService.deleteItemFromBasket(item);
  }

  chengeItemCount(id: string, count: number) {
    this.localStorageService.changeItemCount(id, count);
    this.itemCountChangeStatus = true;
  }

  makeOrder(userFirstName: string, userLastName: string, userPhoneNumber: string, userEmail: string, userNovaPoshta: string) {
    let basket = this.localStorageService.getBasketList();
    let orderUserInfo: string = `Ім'я: ${userFirstName}, прізвище: ${userLastName}, телефон: ${userPhoneNumber}, E-mail: ${userEmail}, відділення Нової Пошти: ${userNovaPoshta}`;
    let orderProductsInfo: string = basket.reduce((info, item, i) => {
      if(i == (basket.length - 1)) {
        return info + `товар: ${item.name}, кількість: ${item.count} шт., ціна: ${+item.price * +item.count} грн.`;
      } else {
        return info + `товар: ${item.name}, кількість: ${item.count} шт., ціна: ${+item.price * +item.count} грн.; `;
      }
    }, '');
    let order: Order = {
      'orderInfo': `${orderUserInfo} Замовлення: ${orderProductsInfo}. Сума: ${this.getOrderSum()} грн.`
    };
    // order['orderInfo'] = orderUserInfo + orderProductsInfo;
    this.dataBaseService.makeOrder(order);
    this.localStorageService.clearBasket();
    this.modalWindowVis = true;

  } 

  closeModalWindow() {
    this.modalWindowVis = false;
    this.router.navigate(['']);
  }

}
