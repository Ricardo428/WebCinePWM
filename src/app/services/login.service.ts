import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private estadoLogin = new BehaviorSubject<boolean>(localStorage.getItem('isloggedIn') === 'true');

  estadoLogin$ = this.estadoLogin.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any>{
    return this.http.get<any>('/assets/json/users.json');
  }

  actualizarEstado(estado: boolean) {
    this.estadoLogin.next(estado);
  }

  hacerLogin(email: string, pass: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((datos) => {
        const usuarioValido = datos.find(
          (u: any) => u.email === email && u.password === pass,
        );

        if (usuarioValido) {
          this.actualizarEstado(true)
          return true;
        }
        return false;
      }),
    );
  }

  cerrarSesion(): void {
    this.actualizarEstado(false);
  }
}
