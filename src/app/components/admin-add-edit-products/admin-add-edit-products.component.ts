import { Component, OnInit, DoCheck } from '@angular/core';

import { DataBaseService } from '../../services/data-base.service';
import { StorageService } from '../../services/storage.service';
import { VetProductsItem } from '../../models/vetProductsItem';

import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-admin-add-edit-products',
  templateUrl: './admin-add-edit-products.component.html',
  styleUrls: ['./admin-add-edit-products.component.scss']
})
export class AdminAddEditProductsComponent implements OnInit, DoCheck {

  constructor(private dataBaseService: DataBaseService,
              private storageService: StorageService,
              private localStorageService: LocalStorageService) { }

  private adminModeValue: boolean;
  visabilityValue: boolean = false;

  ngOnInit() {
    this.setAdminMode();
  }

  ngDoCheck() {
    this.setAdminMode();
  }

  setAdminMode() {
    this.adminModeValue = this.localStorageService.getLoginStatus();
  }

  getAdminState(): boolean {
    return this.adminModeValue;
  }
  
  uploadProduct(type: string, name: string, price: number, descriprion: string, animal: string,  file) {
    event.preventDefault();
    this.storageService.uploadImage(file, type);
    setTimeout(()=> {
      this.storageService.getImageURL(type, file.name).subscribe(resp => {
        let product: VetProductsItem = {
          'name': name,
          'type': type,
          'price': price,
          'description': descriprion,
          'imageURL': `${resp}`,
          'count': 1,
          'animal': animal 
        }
        if(type == 'meds') {
          this.dataBaseService.addMedsItem(product);
        } else if(type == 'feed') {
          this.dataBaseService.addFeedItem(product);
        } else if(type == 'ammo') {
          this.dataBaseService.addAmmoItem(product);
        }
      });
    }, 2000); 
  }  
  
  openOrCloseLoginForm() {
    this.visabilityValue = !this.visabilityValue;
  }
}
