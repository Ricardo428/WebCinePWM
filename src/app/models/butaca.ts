export type EstadoButaca = 'libre' | 'ocupada' | 'seleccionada';
export type TipoButaca = 'normal' | 'silla-ruedas';

export interface Butaca {
  id: string;
  fila: number;
  asiento: number;
  estado: EstadoButaca;
  tipo: TipoButaca;
}
