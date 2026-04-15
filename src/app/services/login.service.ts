import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, BehaviorSubject} from 'rxjs';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // TO DO: Quitar el getusers y el JSON(lo usa el de preferencias) cuando este el firestore
  private estadoLogin = new BehaviorSubject<boolean>(false);

  estadoLogin$ = this.estadoLogin.asObservable();

  constructor(private http: HttpClient,
              private auth: Auth) {}

  getUsers(): Observable<any>{
    return this.http.get<any>('/assets/json/users.json');
  }

  actualizarEstado(estado: boolean) {
    this.estadoLogin.next(estado);
  }


  cerrarSesion(): void {
    this.actualizarEstado(false);
  }


  // Firebase
  registerFire(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginFire(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutFire() {
    return signOut(this.auth);
  }


}
