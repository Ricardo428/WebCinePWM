import {Injectable, OnInit} from '@angular/core';
import {Observable, BehaviorSubject, switchMap, of, map} from 'rxjs';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  estadoLogin$!: Observable<boolean>;

  constructor(private auth: Auth,
              private firestore: Firestore) {

    this.estadoLogin$ = authState(this.auth).pipe(
      map(auth => {
        return !!auth;
      })
    );
  }
  // Firebase
  async registerFire(email: string, password: string) {
    try {
      const credenciales = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = credenciales.user.uid;

      const referenciaUsuario = doc(this.firestore, `usuarios/${uid}`);

      await setDoc(referenciaUsuario, {
        email: email,
        actores: [],
        generos: [],
        puntos: 0,
      });

      return credenciales;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  }

  loginFire(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async cerrarSesion() {
    await signOut(this.auth);
  }

  obtnerUsuarioActual(): Observable<Usuario | null> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (user) {
          const userRef = doc(this.firestore, `usuarios/${user.uid}`);
          return docData(userRef, { idField: 'uid' }) as Observable<Usuario>;
        } else {
          return of(null);
        }
      })
    );

  }

}
