export interface Producto {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
