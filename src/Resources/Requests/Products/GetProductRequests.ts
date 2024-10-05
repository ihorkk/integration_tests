import request from "supertest";
import { baseUrl } from "../../../../common";

export async function getProducts(
  _id?: string,
  nome?: string,
  preco?: number,
  descricao?: string,
  quantidade?: number
) {
  return request(baseUrl)
    .get("/produtos")
    .query({ _id, nome, preco, descricao, quantidade });
}
