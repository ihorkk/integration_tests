import * as generator from "../../../Utils/generator";
import * as requestBody from "../../../Objects/Users/UpdateUserRequestBody";

export function updateUserBody(): requestBody.UpdateUserRequest {
  return {
    nome: generator.generateFullName(),
    email: generator.generateEmail(),
    password: generator.generatePassword(),
    administrador: generator.generateBoolean().toString(),
  };
}
