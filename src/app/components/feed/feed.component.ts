import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { VetProductsItem } from '../../models/vetProductsItem';
import { DataBaseService } from '../../services/data-base.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, DoCheck, OnDestroy {

  feedItems: VetProductsItem[];
  productType: string = 'feed';
  subscriptions: Subscription = new Subscription;

  constructor(private dataBaseService: DataBaseService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.dataBaseService.getFeedItems().subscribe((resp: any) => {
        this.localStorageService.setProductsList(resp, this.productType);
        this.feedItems =  this.localStorageService.getProductsList(this.productType);
      })
    );    
    this.feedItems =  this.localStorageService.getProductsList(this.productType);
  }

  ngDoCheck() {
    if(this.feedItems.length != this.localStorageService.getProductsList(this.productType).length) {
      this.feedItems =  this.localStorageService.getProductsList(this.productType);    
    }  
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
