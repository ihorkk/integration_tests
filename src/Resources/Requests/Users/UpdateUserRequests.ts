import request from "supertest";
import { BASE_URL } from "../../../../constants";
import * as requestBody from "../../../Objects/Users/UpdateUserRequestBody";

export async function updateUser(
  userId: string,
  updateUserBody: requestBody.UpdateUserRequest
) {
  return request(BASE_URL).put(`/usuarios/${userId}`).send(updateUserBody);
}
