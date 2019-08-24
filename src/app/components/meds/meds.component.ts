import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { DataBaseService } from '../../services/data-base.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { VetProductsItem } from '../../models/vetProductsItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meds',
  templateUrl: './meds.component.html',
  styleUrls: ['./meds.component.scss']
})
export class MedsComponent implements OnInit, DoCheck, OnDestroy {

  medsItems: VetProductsItem[];
  productType: string = 'meds';
  subscriptions: Subscription = new Subscription();

  constructor(private dataBaseService: DataBaseService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.dataBaseService.getMedsItems().subscribe((resp: any) => {
        this.localStorageService.setProductsList(resp, this.productType);
        this.medsItems =  this.localStorageService.getProductsList(this.productType);
      })
    );
    
    this.medsItems =  this.localStorageService.getProductsList(this.productType);
  }

  ngDoCheck() {
    if(this.medsItems.length != this.localStorageService.getProductsList(this.productType).length) {
      this.medsItems =  this.localStorageService.getProductsList(this.productType);
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
