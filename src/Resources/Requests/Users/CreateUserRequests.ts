import request from "supertest";
import { baseUrl } from "../../../../common";
import * as requestBody from "../../../Objects/Users/CreateUserRequestBody";

export async function createUser(
  createUserBody: requestBody.CreateUserRequest
) {
  return request(baseUrl).post("/usuarios").send(createUserBody);
}
