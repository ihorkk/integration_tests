import * as responseBody from "../../Objects/Users/DeleteUserResponseBody";

export function validateDeleteUserResponse(
  response: responseBody.DeleteUserResponse
) {
  expect(response.message).toBe("Registro excluído com sucesso");
}
