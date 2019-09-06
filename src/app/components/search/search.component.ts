import { Component, OnInit, Input, OnDestroy, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { LocalStorageService } from '../../services/local-storage.service';
import { DataBaseService } from '../../services/data-base.service';
import { VetProductsItem } from '../../models/vetProductsItem';
import { debounceTime, filter, map, flatMap, switchMap, startWith, delay } from 'rxjs/operators';
import { Subscription, of, NEVER, from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() searchType: string;

  // productSearchControl: FormControl = new FormControl();
  // dogCheckboxControl: FormControl = new FormControl(true);
  // catCheckboxControl: FormControl = new FormControl(true);
  // mainSubscription: any;
  // dogCheckboxSubscriptions:  any;
  // catCheckboxSubscriptions:  any;

  searchForm: FormGroup = new FormGroup ({
    "productSearchControl": new FormControl(),
    "dogCheckboxControl": new FormControl(true),
    "catCheckboxControl": new FormControl(true)
  });

  subscriptions: Subscription = new Subscription();
  searchSubscription:  any;
  dogInit: boolean = false;
  catInit: boolean = false;


  constructor(private localStorageService: LocalStorageService,
              private dataBaseService: DataBaseService) { }

  ngOnInit() {
    setTimeout(()=> {
      this.subscriptions.add(
        this.searchProduct().subscribe((result: VetProductsItem[]) => {
          this.localStorageService.setProductsList(result, this.searchType);
        },
        (err) => console.log(err),
        () => console.log('Complite'))
      );
    }, 1000);
    
   
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
    }, 500);

    //////////////////////////////////////////////////////////////////////////////////////////////

    // this.mainSubscription = of(this.localStorageService.getProductsList(this.searchType)).pipe(
      
    //   map(list => {
    //     console.log('mainSubscription lilst', list, productList);
    //     return list;})
    // );
    
  //   this.searchSubscription = this.productSearchControl.valueChanges.pipe(
  //     debounceTime(600),
  //     startWith(''),
  //     map(input => input.toLowerCase()),
  //     switchMap(input => {
  //       return this.mainSubscription.pipe(
  //         map((list: VetProductsItem[]) => {
  //           console.log('switchMap list', list);
  //           if(!input) {
  //             setTimeout(() => {list = tmpList;}, 650);              
  //           };
  //           let result = list.filter(({name}) => {
  //             name = name.toLowerCase();
  //             if(name.search(input) !== -1) {
  //               return true;
  //             } else {
  //               return false;
  //             }
  //           });
  //           console.log('input result', result);
  //           return result;         
  //         })
  //       )
  //     }),
  //     flatMap((list: VetProductsItem[]) => this.dogCheckboxSubscriptions.pipe(     
  //       map(value => {
  //         if(!value) {
  //           console.log('dogCheckbox productList false', list, productList, value)
  //           return list.filter(({animal}) => animal === 'cat');
  //         } else {
  //           console.log('dogCheckbox productList true', list, productList, value);
            
  //           return list;
  //         }
  //       })
  //     ))
  //   );
    
  //   this.dogCheckboxSubscriptions = this.dogCheckboxControl.valueChanges.pipe(
  //     startWith(true),
  //     map(value => {
  //       console.log('dogCheckboxSubscriptions value', value);
  //       return value;
  //     })
  //   );

  //   return this.searchSubscription;

    
  // };

  /////////////////////////////////////////////////////////////////////
    
    this.searchSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(600),
      map(({productSearchControl, dogCheckboxControl, catCheckboxControl}) => { 
        if(productSearchControl) {
          productSearchControl = productSearchControl.toLowerCase();
        }
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
          name = name.toLowerCase();
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
