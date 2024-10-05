export interface GetProductsResponse {
  quantidade: number;
  produtos: Products;
}

export interface ObjProduct {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
  _id: string;
}

export type Products = Array<ObjProduct>;
