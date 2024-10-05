import * as generator from "../../../Utils/generator";
import * as requestBody from "../../../Objects/Carts/AddToCartRequestBody";

export function addToCartBody(
  productId: string
): requestBody.AddToCartRequestBody {
  return {
    produtos: [
      {
        idProduto: productId,
        quantidade: generator.generateInteger(1, 1),
      },
    ],
  };
}
