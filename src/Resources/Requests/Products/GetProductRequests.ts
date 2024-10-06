import request from "supertest";
import { BASE_URL } from "../../../../constants";

export async function getProducts(
  _id?: string,
  nome?: string,
  preco?: number,
  descricao?: string,
  quantidade?: number
) {
  return request(BASE_URL)
    .get("/produtos")
    .query({ _id, nome, preco, descricao, quantidade });
}
