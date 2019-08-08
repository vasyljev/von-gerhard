import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  imageURL: Observable<string | null>;

  uploadImage(file, type: string) {
    const filePath = `${type}/${file.name}`;
    const ref = this.storage.ref(filePath);
    const tusk = ref.put(file);
  }

  getImageURL(type: string, name: string) {
    const ref = this.storage.ref(`${type}/${name}`);
    this.imageURL = ref.getDownloadURL();
    return this.imageURL;  
  }  
}
