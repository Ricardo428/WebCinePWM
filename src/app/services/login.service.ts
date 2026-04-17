import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, BehaviorSubject, switchMap, of} from 'rxjs';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {doc, docData, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // TO DO: Quitar el getusers y el JSON(lo usa el de preferencias) cuando este el firestore
  private estadoLogin = new BehaviorSubject<boolean>(false);

  estadoLogin$ = this.estadoLogin.asObservable();

  constructor(private http: HttpClient,
              private auth: Auth,
              private firestore: Firestore) {}

  getUsers(): Observable<any>{
    return this.http.get<any>('/assets/json/users.json');
  }

  actualizarEstado(estado: boolean) {
    this.estadoLogin.next(estado);
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
        historial: []
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
    this.actualizarEstado(false);
  }

  obtnerUsuarioActual(): Observable<any> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (user){
          const userRef = doc(this.firestore, `usuarios/${user.uid}`)

          return docData(userRef)
        } else
          return of(null);
      })
    )

  }

}
