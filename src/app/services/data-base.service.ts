import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { VetProductsItem } from '../models/vetProductsItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  productsMedsCollection: AngularFirestoreCollection<VetProductsItem>;
  productsFeedCollection: AngularFirestoreCollection<VetProductsItem>;
  productsAmmoCollection: AngularFirestoreCollection<VetProductsItem>;
  ordersCollection: AngularFirestoreCollection<Order>;


  medsProducts: Observable<VetProductsItem[]>;
  feedProducts: Observable<VetProductsItem[]>;
  ammoProducts: Observable<VetProductsItem[]>;
  orderProducts: Observable<Order[]>;
  
  productDoc: AngularFirestoreDocument<VetProductsItem>;

  constructor(private dataBase: AngularFirestore) {
    this.productsMedsCollection = this.dataBase.collection<VetProductsItem>(`meds`);
    this.medsProducts = this.dataBase.collection('meds').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as VetProductsItem;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
    this.productsFeedCollection = this.dataBase.collection<VetProductsItem>(`feed`);
    this.feedProducts = this.dataBase.collection('feed').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as VetProductsItem;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
    this.ordersCollection = this.dataBase.collection<Order>('orders');
    this.orderProducts = this.dataBase.collection<Order>('orders').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Order;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
    this.productsAmmoCollection = this.dataBase.collection<VetProductsItem>(`ammo`);
    this.ammoProducts = this.dataBase.collection('ammo').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as VetProductsItem;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  MEDS  //////////////////////////////////////////////////

  getMedsItems() {
    return this.medsProducts;
  }

  addMedsItem(item: VetProductsItem) {
    this.productsMedsCollection.add(item);
  }

  deleteMedsItem(item: VetProductsItem) {
    this.productDoc = this.dataBase.doc(`meds/${item.id}`);
    this.productDoc.delete();
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  FEED  //////////////////////////////////////////////////

  getFeedItems() {
    return this.feedProducts;
  }

  addFeedItem(item: VetProductsItem) {
    this.productsFeedCollection.add(item);
  }

  deleteFeedItem(item: VetProductsItem) {
    this.productDoc = this.dataBase.doc(`feed/${item.id}`);
    this.productDoc.delete();
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  AMMO  //////////////////////////////////////////////////

  getAmmoItems() {
    return this.ammoProducts;
  }

  addAmmoItem(item: VetProductsItem) {
    this.productsAmmoCollection.add(item);
  }

  deleteAmmoItem(item: VetProductsItem) {
    this.productDoc = this.dataBase.doc(`ammo/${item.id}`);
    this.productDoc.delete();
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  ORDER  /////////////////////////////////////////////////

  makeOrder(order: Order) {
    this.ordersCollection.add(order);
  }

  getOrderList() {
    return this.orderProducts;
  }

  deleteOrder(item: Order) {
    this.productDoc = this.dataBase.doc(`orders/${item.id}`);
    this.productDoc.delete();
  }


}

