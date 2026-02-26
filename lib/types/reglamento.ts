// types/reglamento.ts
export interface Articulo {
  numero: string;
  texto: string;
}

export interface BloqueReglamento {
  titulo: string;
  articulos: Articulo[];
}

export interface ActiveArticle extends Articulo {
  titulo: string;
}