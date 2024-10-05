import * as responseBody from "../../Objects/Products/GetProductResponseBody";
import * as requestBody from "../../Objects/Products/CreateProductRequestBody";

export function validateGetProducts(
  response: responseBody.GetProductsResponse,
  requestBody: requestBody.CreateProductRequestBody,
  productId: string
) {
  expect(response.quantidade).toBe(1);

  const product = response.produtos[0];
  expect(product.nome).toBe(requestBody.nome);
  expect(product.preco).toBe(requestBody.preco);
  expect(product.descricao).toBe(requestBody.descricao);
  expect(product.quantidade).toBe(requestBody.quantidade);
  expect(product._id).toBe(productId);
}
