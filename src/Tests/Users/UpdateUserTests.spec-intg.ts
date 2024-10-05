import { describe, it } from "@jest/globals";
import * as body from "../../Data/Bodies/Users/UpdateUserBodies";
import * as request from "../../Resources/Requests/Users/UpdateUserRequests";
import * as requestBody from "../../Objects/Users/UpdateUserRequestBody";
import * as responseBody from "../../Objects/Users/UpdateUserResponseBody";
import * as validator from "../../Validators/Users/UpdateUserValidator";
import { GetUserByIdResponse } from "../../Objects/Users/GetUserByIdResponseBody";
import { validateGetUserByIdResponse } from "../../Validators/Users/GetUserByIdValidator";
import { getUserById } from "../../Resources/Requests/Users/GetUserByIdRequest";
import { deleteUser } from "../../Resources/Requests/Users/DeleteUserRequests";
import { CreateUserRequest } from "../../Objects/Users/CreateUserRequestBody";
import { createUserBody } from "../../Data/Bodies/Users/CreateUserBodies";
import { createUser } from "../../Resources/Requests/Users/CreateUserRequests";
import { CreateUserResponse } from "../../Objects/Users/CreateUserResponseBody";

describe("Update User Tests", () => {
  let userId: string;
  let userId2: string;

  beforeEach(async () => {
    // Create a user
    const newUserBody: CreateUserRequest = createUserBody();
    const createUserResponse = await createUser(newUserBody);
    const createUserResponseBody: CreateUserResponse = createUserResponse.body;
    userId = createUserResponseBody._id;
  });

  afterEach(async () => {
    // Delete the user
    if (userId || userId2) {
      for (const user of [userId, userId2]) {
        await deleteUser(user);
      }
    }
  });

  it("should update a user", async () => {
    // Update the user
    const updateUserBody: requestBody.UpdateUserRequest = body.updateUserBody();
    const updateUserResponse = await request.updateUser(userId, updateUserBody);
    const updateUserResponseBody: responseBody.UpdateUserResponse =
      updateUserResponse.body;

    // Validate the response
    expect(updateUserResponse.status).toBe(200);
    validator.validateUpdateUserResponse(updateUserResponseBody);

    // Get the updated user by id
    const getUserByIdResponse = await getUserById(userId);
    const getUserByIdResponseBody: GetUserByIdResponse =
      getUserByIdResponse.body;

    // Validate the response
    validateGetUserByIdResponse(
      getUserByIdResponseBody,
      updateUserBody,
      userId
    );
  });

  it("should not update a user with an existing email", async () => {
    const expectedMessage = "Este email já está sendo usado";

    // Create another user
    const newUserBody2: CreateUserRequest = createUserBody();
    const createUserResponse2 = await createUser(newUserBody2);
    const createUserResponseBody2: CreateUserResponse =
      createUserResponse2.body;
    userId2 = createUserResponseBody2._id;

    // Update the first user with the email of the second user
    const updateUserBody: requestBody.UpdateUserRequest = body.updateUserBody();
    updateUserBody.email = newUserBody2.email;
    const updateUserResponse = await request.updateUser(userId, updateUserBody);
    const updateUserResponseBody: responseBody.UpdateUserResponse =
      updateUserResponse.body;

    // Validate the response
    expect(updateUserResponse.status).toBe(400);
    expect(updateUserResponseBody.message).toBe(expectedMessage);
  });
});
