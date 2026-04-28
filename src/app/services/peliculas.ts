import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Peliculas {

  constructor(private fire: Firestore) { }

  getPeliculas(){
    const colRef = collection(this.fire, 'peliculas');
    return collectionData(colRef, { idField: 'id' }) as Observable<any[]>
  }

}
