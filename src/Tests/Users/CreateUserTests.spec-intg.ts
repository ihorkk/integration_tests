import { describe, it } from "@jest/globals";
import * as body from "../../Data/Bodies/Users/CreateUserBodies";
import * as request from "../../Resources/Requests/Users/CreateUserRequests";
import * as requestBody from "../../Objects/Users/CreateUserRequestBody";
import * as responseBody from "../../Objects/Users/CreateUserResponseBody";
import * as validator from "../../Validators/Users/CreateUserValidator";
import { GetUserByIdResponse } from "../../Objects/Users/GetUserByIdResponseBody";
import { validateGetUserByIdResponse } from "../../Validators/Users/GetUserByIdValidator";
import { getUserById } from "../../Resources/Requests/Users/GetUserByIdRequest";
import { deleteUser } from "../../Resources/Requests/Users/DeleteUserRequests";
import { ErrorResponse } from "../../Objects/Common/CommonResponse";
import { validateErrorResponse } from "../../Validators/Common/ErrorValidator";

describe("Creat User Tests", () => {
  let userId: string;

  afterEach(async () => {
    // Delete the user
    await deleteUser(userId);
  });

  it("should create a user", async () => {
    // Create a user
    const createUserBody: requestBody.CreateUserRequest = body.createUserBody();
    const createUserResponse = await request.createUser(createUserBody);
    const createUserResponseBody: responseBody.CreateUserResponse =
      createUserResponse.body;
    userId = createUserResponseBody._id;

    // Validate the response
    expect(createUserResponse.status).toBe(201);
    validator.validateCreateUserResponse(createUserResponse.body);

    // Get the created user by id
    const getUserByIdResponse = await getUserById(userId);
    const getUserByIdResponseBody: GetUserByIdResponse =
      getUserByIdResponse.body;

    // Validate the response
    validateGetUserByIdResponse(getUserByIdResponseBody, createUserBody, userId);
  });

  it("should not create a user with an existing email", async () => {
    const expectedMessage = "Este email já está sendo usado";

    // Create a user
    const createUserBody: requestBody.CreateUserRequest = body.createUserBody();
    const createUserResponse = await request.createUser(createUserBody);
    const createUserResponseBody: responseBody.CreateUserResponse =
      createUserResponse.body;
    userId = createUserResponseBody._id;

    // Create another user with the same email
    const createUserResponse2 = await request.createUser(createUserBody);
    const createUserResponseBody2: ErrorResponse = createUserResponse2.body;

    // Validate the response
    expect(createUserResponse2.status).toBe(400);
    validateErrorResponse(createUserResponseBody2, expectedMessage);
  });
});
