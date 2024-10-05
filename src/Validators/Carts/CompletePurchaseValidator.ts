import * as responseBody from "../../Objects/Carts/CompletePurchaseResponseBody";

export function validateCompletePurchaseResponse(
  response: responseBody.CompletePurchaseResponseBody
) {
  expect(response.message).toBe("Registro excluído com sucesso");
}
