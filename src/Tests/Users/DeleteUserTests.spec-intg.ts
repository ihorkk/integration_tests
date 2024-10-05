import { describe, it } from "@jest/globals";
import * as request from "../../Resources/Requests/Users/DeleteUserRequests";
import * as responseBody from "../../Objects/Users/DeleteUserResponseBody";
import * as validator from "../../Validators/Users/DeleteUserValidator";
import { getUserById } from "../../Resources/Requests/Users/GetUserByIdRequest";
import { ErrorResponse } from "../../Objects/Common/CommonResponse";
import { validateErrorResponse } from "../../Validators/Common/ErrorValidator";
import { CreateUserRequest } from "../../Objects/Users/CreateUserRequestBody";
import { createUserBody } from "../../Data/Bodies/Users/CreateUserBodies";
import { createUser } from "../../Resources/Requests/Users/CreateUserRequests";
import { CreateUserResponse } from "../../Objects/Users/CreateUserResponseBody";

describe("Delete User Tests", () => {
  let userId: string;

  beforeEach(async () => {
    // Create a user
    const newUserBody: CreateUserRequest = createUserBody();
    const createUserResponse = await createUser(newUserBody);
    const createUserResponseBody: CreateUserResponse = createUserResponse.body;
    userId = createUserResponseBody._id;
  });

  it("should delete a user", async () => {
    // Delete the user
    const deleteUserResponse = await request.deleteUser(userId);
    const deleteUserResponseBody: responseBody.DeleteUserResponse =
      deleteUserResponse.body;

    // Validate the response
    expect(deleteUserResponse.status).toBe(200);
    validator.validateDeleteUserResponse(deleteUserResponseBody);

    // Get the deleted user by id
    const expectedMessage = "Usuário não encontrado";

    const getUserByIdResponse = await getUserById(userId);
    const getUserByIdResponseBody: ErrorResponse = getUserByIdResponse.body;
    expect(getUserByIdResponse.status).toBe(400);
    validateErrorResponse(getUserByIdResponseBody, expectedMessage);
  });
});
