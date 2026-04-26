import { Injectable, inject } from '@angular/core';
import {Firestore, doc, getDoc, updateDoc, setDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private firestore: Firestore = inject(Firestore);

  async obtenerPreferencias(email: string) {
    const userRef = doc(this.firestore, `usuarios/${email}`);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() : null;
  }

  async guardarPreferencias(email: string, generos: string[], actores: string[]) {
    const userRef = doc(this.firestore, `usuarios/${email}`);
    return updateDoc(userRef, { generos, actores });
  }

  async crearUsuario(usuario: any) {
    const userRef = doc(this.firestore, `usuarios/${usuario.email}`);
    return setDoc(userRef, usuario);
  }
}
