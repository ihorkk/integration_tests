import request from "supertest";
import { baseUrl } from "../../../../common";

export async function completePurchase(token: string) {
  return request(baseUrl).delete("/carrinhos/concluir-compra").set({
    Authorization: token,
  });
}
