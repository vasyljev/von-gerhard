import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { VetProductsItem } from './../../models/vetProductsItem';
import { DataBaseService } from '../../services/data-base.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, DoCheck {

  @Input() vetProductsItem: VetProductsItem;

  loginStatus: boolean;
  shurtProductDescription: string;
  basketStatus: boolean;
  
  constructor(private dataBase: DataBaseService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.cutProductDescription();
    this.basketStatus = this.localStorageService.checkProductInBasket(this.vetProductsItem);
  }

  ngDoCheck() {
    this.loginStatus = this.localStorageService.getLoginStatus();
    this.basketStatus = this.localStorageService.checkProductInBasket(this.vetProductsItem);
  }

  deleteItem(item: VetProductsItem, type: string) {
    type == 'meds' ? this.dataBase.deleteMedsItem(item) : this.dataBase.deleteFeedItem(item);
  }

  cutProductDescription() {
    let productDescription = this.vetProductsItem.description;
    let descriptionArray = productDescription.split(' ');
    if(descriptionArray.length > 14) {
      descriptionArray.length = 14;
      this.shurtProductDescription = descriptionArray.join(' ') + '...';
    } else {
      this.shurtProductDescription = descriptionArray.join(' ');
    }
    
  }

  addOrDeletePRoductFromBasket(product: VetProductsItem) {
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

}
