import request from "supertest";
import { baseUrl } from "../../../../common";

export async function deleteUser(userId: string) {
  return request(baseUrl).delete(`/usuarios/${userId}`);
}
