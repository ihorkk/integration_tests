import request from "supertest";
import { baseUrl } from "../../../../common";

export async function deleteProduct(productId: string, token: string) {
  return request(baseUrl).delete(`/produtos/${productId}`).set({
    Authorization: token,
  });
}
