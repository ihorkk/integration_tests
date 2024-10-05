import * as responseBody from "../../Objects/Users/GetUserByIdResponseBody";
import * as requestBody from "../../Objects/Users/CreateUserRequestBody";

export function validateGetUserByIdResponse(
  response: responseBody.GetUserByIdResponse,
  requestBody: requestBody.CreateUserRequest,
  userId: string
) {
  expect(response.nome).toBe(requestBody.nome);
  expect(response.email).toBe(requestBody.email);
  expect(response.password).toBe(requestBody.password);
  expect(response.administrador).toBe(requestBody.administrador);
  expect(response._id).toBe(userId);
}
