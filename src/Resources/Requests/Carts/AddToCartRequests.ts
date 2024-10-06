import request from "supertest";
import { BASE_URL } from "../../../../constants";
import * as requestBody from "../../../Objects/Carts/AddToCartRequestBody";

export async function addToCart(
  addToCart: requestBody.AddToCartRequestBody,
  token: string
) {
  return request(BASE_URL).post("/carrinhos").send(addToCart).set({
    Authorization: token,
  });
}
