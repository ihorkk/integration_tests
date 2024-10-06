import request from "supertest";
import { BASE_URL } from "../../../../constants";

export async function completePurchase(token: string) {
  return request(BASE_URL).delete("/carrinhos/concluir-compra").set({
    Authorization: token,
  });
}
