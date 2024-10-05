import * as responseBody from "../../Objects/Users/UpdateUserResponseBody";

export function validateUpdateUserResponse(
  response: responseBody.UpdateUserResponse
) {
  expect(response.message).toBe("Registro alterado com sucesso");
}
