import { Component, OnInit, DoCheck } from '@angular/core';

import { DataBaseService } from '../../services/data-base.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, DoCheck {

  constructor(private dataBaseService: DataBaseService,
              private localStorageService: LocalStorageService) { }

  orderList: Order[]; 

  ngOnInit() {
    this.initOrderList();
    this.orderList = this.localStorageService.getOrderList();
  }

  ngDoCheck() {
    this.orderList = this.localStorageService.getOrderList();
  }

  initOrderList() {
    this.dataBaseService.getOrderList().subscribe(list => {
      console.log('list', list);
      this.localStorageService.setOrderList(list);
    });
  }

  deleteOrder(order: Order) {
    console.log('delete');
    this.dataBaseService.deleteOrder(order);
    this.localStorageService.deleteOrderItem(order);
  }

}
