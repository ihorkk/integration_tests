import * as responseBody from "../../Objects/Users/CreateUserResponseBody";

export function validateCreateUserResponse(
  response: responseBody.CreateUserResponse
) {
  expect(response.message).toBe("Cadastro realizado com sucesso");
  expect(response._id).not.toBe("");
}
