import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth) {}


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
