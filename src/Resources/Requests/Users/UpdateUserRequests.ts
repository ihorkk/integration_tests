import request from "supertest";
import { baseUrl } from "../../../../common";
import * as requestBody from "../../../Objects/Users/UpdateUserRequestBody";

export async function updateUser(
  userId: string,
  updateUserBody: requestBody.UpdateUserRequest
) {
  return request(baseUrl).put(`/usuarios/${userId}`).send(updateUserBody);
}
