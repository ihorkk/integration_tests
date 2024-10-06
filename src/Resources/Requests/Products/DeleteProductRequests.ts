import request from "supertest";
import { BASE_URL } from "../../../../constants";

export async function deleteProduct(productId: string, token: string) {
  return request(BASE_URL).delete(`/produtos/${productId}`).set({
    Authorization: token,
  });
}
