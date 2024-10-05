import * as requestBody from "../../../Objects/Login/LoginRequestBody";

export function loginBody(
  email: string,
  password: string
): requestBody.LoginRequest {
  return {
    email: email,
    password: password,
  };
}
