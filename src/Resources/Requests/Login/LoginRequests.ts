import request from "supertest";
import { BASE_URL } from "../../../../constants";
import * as requestBody from "../../../Objects/Login/LoginRequestBody";

export async function login(loginBody: requestBody.LoginRequest) {
  return request(BASE_URL).post("/login").send(loginBody);
}
