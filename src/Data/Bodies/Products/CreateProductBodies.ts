import * as generator from "../../../Utils/generator";
import * as requestBody from "../../../Objects/Products/CreateProductRequestBody";

export function createProductBody(): requestBody.CreateProductRequestBody {
  return {
    nome: generator.generateProductName(),
    preco: generator.generateInteger(5, 1000),
    descricao: generator.generateProductDescription(),
    quantidade: generator.generateInteger(1, 100),
  };
}
