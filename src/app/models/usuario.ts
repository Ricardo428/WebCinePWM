export interface Usuario {
  uid?: string;
  nombre: string;
  apellido: string;
  email: string;
  nacimiento: string;
  password: string;
  foto?: string;        // Base64 de la foto de perfil
  actores: string[];
  generos: string[];
  puntos: number;
}
