import * as generator from "../../../Utils/generator";
import * as requestBody from "../../../Objects/Users/CreateUserRequestBody";

export function createUserBody(): requestBody.CreateUserRequest {
  return {
    nome: generator.generateFullName(),
    email: generator.generateEmail(),
    password: generator.generatePassword(),
    administrador: generator.generateBoolean().toString(),
  };
}
