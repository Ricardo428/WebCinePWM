import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {addDoc, collection, collectionData, Firestore, where,query} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class HistorialService {

  constructor(private firestore: Firestore) {}


  addBuy(buy: any) {
    const colRef = collection(this.firestore, 'historial');
    return addDoc(colRef, buy);
  }

  getHistorial(uuid: string): Observable<any>{
    const colRef = collection(this.firestore, 'historial');
    const q = query(colRef, where('user',"==", uuid));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }



}
