import { describe, it } from "@jest/globals";
import * as body from "../../Data/Bodies/Login/LoginBodies";
import * as request from "../../Resources/Requests/Login/LoginRequests";
import * as requestBody from "../../Objects/Login/LoginRequestBody";
import * as responseBody from "../../Objects/Login/LoginResponseBody";
import * as validator from "../../Validators/Login/LoginValidator";
import { deleteUser } from "../../Resources/Requests/Users/DeleteUserRequests";
import { CreateUserRequest } from "../../Objects/Users/CreateUserRequestBody";
import { createUserBody } from "../../Data/Bodies/Users/CreateUserBodies";
import { createUser } from "../../Resources/Requests/Users/CreateUserRequests";
import { CreateUserResponse } from "../../Objects/Users/CreateUserResponseBody";
import { validateErrorResponse } from "../../Validators/Common/ErrorValidator";
import { getUserById } from "../../Resources/Requests/Users/GetUserByIdRequest";

describe("Update User Tests", () => {
  let newUserBody: CreateUserRequest;
  let userId: string;

  beforeEach(async () => {
    // Create a user
    newUserBody = createUserBody();
    const createUserResponse = await createUser(newUserBody);
    const createUserResponseBody: CreateUserResponse = createUserResponse.body;
    userId = createUserResponseBody._id;
  });

  afterEach(async () => {
    // Delete the user
    if (userId) {
      await deleteUser(userId);
    }
  });

  it("should log in ", async () => {
    // Log in
    const loginBody: requestBody.LoginRequest = body.loginBody(
      newUserBody.email,
      newUserBody.password
    );
    const loginResponse = await request.login(loginBody);
    const loginResponseBody: responseBody.LoginResponse = loginResponse.body;

    // Validate the response
    expect(loginResponse.status).toBe(200);
    validator.validateLoginResponse(loginResponseBody);

    // Validate the token
    const getUsersResponse = await getUserById(userId);
    expect(getUsersResponse.status).toBe(200);
  });

  it("should not log in with invalid credentials", async () => {
    const expectedMessage = "Email e/ou senha inválidos";

    // Log in
    const loginBody: requestBody.LoginRequest = body.loginBody(
      newUserBody.email,
      "invalidPassword"
    );
    const loginResponse = await request.login(loginBody);
    const loginResponseBody: responseBody.LoginResponse = loginResponse.body;

    // Validate the response
    expect(loginResponse.status).toBe(401);
    validateErrorResponse(loginResponseBody, expectedMessage);
  });
});
