import * as responseBody from "../../Objects/Products/CreateProductResponseBody";

export function validateCreateProductResponse(
  response: responseBody.CreateProductResponse
) {
  expect(response.message).toBe("Cadastro realizado com sucesso");
  expect(response._id).not.toBe("");
}
