import request from "supertest";
import { baseUrl } from "../../../../common";
import * as requestBody from "../../../Objects/Products/CreateProductRequestBody";

export async function createProduct(
  createProductBody: requestBody.CreateProductRequestBody,
  token: string
) {
  return request(baseUrl).post("/produtos").send(createProductBody).set({
    Authorization: token,
  });
}
