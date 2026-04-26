import { Injectable, inject } from '@angular/core';
import {Firestore, doc, getDoc, updateDoc, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private firestore: Firestore = inject(Firestore);

  async obtenerPreferencias(uid: string) {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() : null;
  }

  async guardarPreferencias(uid: string, generos: string[], actores: string[]) {
    const userRef = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(userRef, { generos, actores });
  }

  async crearUsuario(usuario: any) {
    const userRef = doc(this.firestore, `usuarios/${usuario.uid}`);
    return setDoc(userRef, usuario);
  }
}
