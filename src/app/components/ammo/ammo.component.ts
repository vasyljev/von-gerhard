import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { DataBaseService } from '../../services/data-base.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { VetProductsItem } from '../../models/vetProductsItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ammo',
  templateUrl: './ammo.component.html',
  styleUrls: ['./ammo.component.scss']
})
export class AmmoComponent implements OnInit, DoCheck, OnDestroy {

  ammoItems: VetProductsItem[];
  productType: string = 'ammo';
  subscriptions: Subscription = new Subscription();

  constructor(private dataBaseService: DataBaseService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.dataBaseService.getAmmoItems().subscribe((resp: any) => {
        this.localStorageService.setProductsList(resp, this.productType);
        this.ammoItems =  this.localStorageService.getProductsList(this.productType);
      })
    );
    
    this.ammoItems =  this.localStorageService.getProductsList(this.productType);
  }

  ngDoCheck() {
    if(this.ammoItems.length != this.localStorageService.getProductsList(this.productType).length) {
      this.ammoItems =  this.localStorageService.getProductsList(this.productType);
    }
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
