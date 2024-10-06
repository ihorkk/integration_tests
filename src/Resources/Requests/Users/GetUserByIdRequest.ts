import request from "supertest";
import { BASE_URL } from "../../../../constants";

export async function getUserById(userId: string) {
  return request(BASE_URL).get(`/usuarios/${userId}`);
}
