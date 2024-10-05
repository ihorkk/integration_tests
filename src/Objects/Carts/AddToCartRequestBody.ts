export interface AddToCartRequestBody {
  produtos: Products;
}

type Products = Array<ObjProduct>;

interface ObjProduct {
  idProduto: string;
  quantidade: number;
}
