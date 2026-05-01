export interface Usuario {
  uid?: string;
  nombre: string;
  apellido: string;
  email: string;
  nacimiento: string;
  password: string;
  actores: string[];
  generos: string[];
  puntos: number;
}
