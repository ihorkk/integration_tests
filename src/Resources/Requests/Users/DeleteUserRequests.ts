import request from "supertest";
import { BASE_URL } from "../../../../constants";

export async function deleteUser(userId: string) {
  return request(BASE_URL).delete(`/usuarios/${userId}`);
}
