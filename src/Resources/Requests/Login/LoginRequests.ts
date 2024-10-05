import request from "supertest";
import { baseUrl } from "../../../../common";
import * as requestBody from "../../../Objects/Login/LoginRequestBody";

export async function login(loginBody: requestBody.LoginRequest) {
  return request(baseUrl).post("/login").send(loginBody);
}
