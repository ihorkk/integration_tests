import * as responseBody from "../../Objects/Login/LoginResponseBody";

export function validateLoginResponse(response: responseBody.LoginResponse) {
  expect(response.message).toBe("Login realizado com sucesso");
  expect(response.authorization).toContain("Bearer ");
}
