import request from "supertest";
import { BASE_URL } from "../../../../constants";
import * as requestBody from "../../../Objects/Products/CreateProductRequestBody";

export async function createProduct(
  createProductBody: requestBody.CreateProductRequestBody,
  token: string
) {
  return request(BASE_URL).post("/produtos").send(createProductBody).set({
    Authorization: token,
  });
}
