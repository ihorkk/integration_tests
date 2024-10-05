import request from "supertest";
import { baseUrl } from "../../../../common";
import * as requestBody from "../../../Objects/Carts/AddToCartRequestBody";

export async function addToCart(
  addToCart: requestBody.AddToCartRequestBody,
  token: string
) {
  return request(baseUrl).post("/carrinhos").send(addToCart).set({
    Authorization: token,
  });
}
