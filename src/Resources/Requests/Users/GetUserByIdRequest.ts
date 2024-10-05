import request from "supertest";
import { baseUrl } from "../../../../common";

export async function getUserById(userId: string) {
  return request(baseUrl).get(`/usuarios/${userId}`);
}
