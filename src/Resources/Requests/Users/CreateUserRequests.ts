import request from "supertest";
import { BASE_URL } from "../../../../constants";
import * as requestBody from "../../../Objects/Users/CreateUserRequestBody";

export async function createUser(
  createUserBody: requestBody.CreateUserRequest
) {
  return request(BASE_URL).post("/usuarios").send(createUserBody);
}
