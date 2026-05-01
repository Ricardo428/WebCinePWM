import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MetodoPago } from '../models/metodo-pago';

@Injectable({
  providedIn: 'root',
})
export class SeleccionPagoService {
  constructor(private firestore: Firestore) {}

  getMetodosPago(): Observable<MetodoPago[]> {
    const colRef = collection(this.firestore, 'metodos_pago');
    return collectionData(colRef, { idField: 'id' }) as Observable<MetodoPago[]>;
  }
}
