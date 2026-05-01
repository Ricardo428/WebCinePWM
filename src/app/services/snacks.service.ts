import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Producto } from '../models/snack';

@Injectable({
  providedIn: 'root',
})
export class SnacksService {
  constructor(private firestore: Firestore) {}

  getSnacks(): Observable<Producto[]> {
    const colRef = collection(this.firestore, 'snacks');
    return collectionData(colRef, { idField: 'id' }) as Observable<Producto[]>;
  }
}
