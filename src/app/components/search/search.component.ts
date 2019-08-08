import { Component, OnInit, Input, OnDestroy, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { LocalStorageService } from '../../services/local-storage.service';
import { DataBaseService } from '../../services/data-base.service';
import { VetProductsItem } from '../../models/vetProductsItem';
import { debounceTime, filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() searchType: string;

  searchSubscription: any;
  searchForm: FormGroup = new FormGroup ({
    "productSearchControl": new FormControl(),
    "dogCheckboxControl": new FormControl(true),
    "catCheckboxControl": new FormControl(true)
  });
  subscriptions: Subscription = new Subscription();
  dogInit: boolean = false;
  catInit: boolean = false;


  constructor(private localStorageService: LocalStorageService,
              private dataBaseService: DataBaseService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.searchProduct().subscribe((result: VetProductsItem[]) => {     
        this.localStorageService.setProductsList(result, this.searchType);
      },
      (err) => console.log(err),
      () => console.log('Complite'))
    );
   
  }



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchProduct() {   
    let productList: VetProductsItem[];
    let tmpList: VetProductsItem[];
    setTimeout(() => {
      productList = this.localStorageService.getProductsList(this.searchType);
      tmpList = this.localStorageService.getProductsList(this.searchType);
    }, 1000);       
    this.searchSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(600),
      map(({productSearchControl, dogCheckboxControl, catCheckboxControl}) => { 
        productSearchControl = productSearchControl.toLocaleLowerCase();``
        if((dogCheckboxControl && this.dogInit) || (catCheckboxControl && this.catInit)) {
          this.dowloadListFromDB(this.searchType, productList);
          productList =  tmpList;          
        }
        if(!catCheckboxControl) {
          productList = productList.filter(({animal}) => animal === 'dog');
        };
        if(!dogCheckboxControl) {
          productList = productList.filter(({animal}) => animal === 'cat');         
        }
        let result = productList.filter(({name}) => {
          name = name.toLocaleLowerCase();
          if(!productSearchControl) {
            return true;
          } else if(name.search(productSearchControl) !== -1) {
            return true;
          } else {
            return false;
          }
        });
        return result;
      })
    )
    return this.searchSubscription;
  }

  iniziateChackbox(name: string) {
    if(name === 'dog'&& !this.dogInit) {
      this.dogInit = true;
    };
    if(name === 'cat' && !this.catInit) {
      this.catInit = true; 
    }     
  }

  dowloadListFromDB(type: string, list: VetProductsItem[]) {
    console.log('dowloadListFromDB');
    if(list.length == 0) {
      if(type === 'meds') {
        this.subscriptions.add(
          this.dataBaseService.getMedsItems().subscribe((resp: any) => {
            this.localStorageService.setProductsList(resp, type);
            list = this.localStorageService.getProductsList(type);        
          })
        );
      } else if(type === 'feed')  {
        this.subscriptions.add(
          this.dataBaseService.getFeedItems().subscribe((resp: any) => {
            this.localStorageService.setProductsList(resp, type);
            list = this.localStorageService.getProductsList(type);
          })
        );       
      }  else if(type === 'ammo')  {
        this.subscriptions.add(
          this.dataBaseService.getAmmoItems().subscribe((resp: any) => {
            this.localStorageService.setProductsList(resp, type);
            list = this.localStorageService.getProductsList(type);
          })
        );       
      }
    }
  }
}
