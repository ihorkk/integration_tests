import { describe, it } from "@jest/globals";
import * as body from "../../Data/Bodies/Products/CreateProductBodies";
import * as request from "../../Resources/Requests/Products/CreateProductRequests";
import * as requestBody from "../../Objects/Products/CreateProductRequestBody";
import * as responseBody from "../../Objects/Products/CreateProductResponseBody";
import * as validator from "../../Validators/Products/CreateProductValidator";
import { deleteUser } from "../../Resources/Requests/Users/DeleteUserRequests";
import { CreateUserRequest } from "../../Objects/Users/CreateUserRequestBody";
import { createUserBody } from "../../Data/Bodies/Users/CreateUserBodies";
import { createUser } from "../../Resources/Requests/Users/CreateUserRequests";
import { CreateUserResponse } from "../../Objects/Users/CreateUserResponseBody";
import { login } from "../../Resources/Requests/Login/LoginRequests";
import { LoginRequest } from "../../Objects/Login/LoginRequestBody";
import { loginBody } from "../../Data/Bodies/Login/LoginBodies";
import { LoginResponse } from "../../Objects/Login/LoginResponseBody";
import { deleteProduct } from "../../Resources/Requests/Products/DeleteProductRequests";
import { getProducts } from "../../Resources/Requests/Products/GetProductRequests";
import { GetProductsResponse } from "../../Objects/Products/GetProductResponseBody";
import { validateGetProducts } from "../../Validators/Products/GetProductValidator";

describe("Create Product Tests", () => {
  let userId: string;
  let token: string;
  let productId: string;

  beforeEach(async () => {
    // Create a user
    const newUserBody: CreateUserRequest = createUserBody();
    newUserBody.administrador = "true";
    const createUserResponse = await createUser(newUserBody);
    const createUserResponseBody: CreateUserResponse = createUserResponse.body;
    userId = createUserResponseBody._id;

    // Login the user
    const loginRequestBody: LoginRequest = loginBody(
      newUserBody.email,
      newUserBody.password
    );
    const loginResponse = await login(loginRequestBody);
    const loginResponseBody: LoginResponse = loginResponse.body;
    token = loginResponseBody.authorization;
  });

  afterEach(async () => {
    // Delete the product
    await deleteProduct(productId, token);

    // Delete the user
    await deleteUser(userId);
  });

  it("should create a product", async () => {
    // Create a product
    const createProductBody: requestBody.CreateProductRequestBody =
      body.createProductBody();
    const createProductResponse = await request.createProduct(
      createProductBody,
      token
    );
    const createProductResponseBody: responseBody.CreateProductResponse =
      createProductResponse.body;
    productId = createProductResponseBody._id;

    // Validate the response
    expect(createProductResponse.status).toBe(201);
    validator.validateCreateProductResponse(createProductResponseBody);

    // Get the created product by id
    const getProductByIdResponse = await getProducts(productId);
    const getProductByIdResponseBody: GetProductsResponse =
      getProductByIdResponse.body;

    expect(getProductByIdResponse.status).toBe(200);
    validateGetProducts(
      getProductByIdResponseBody,
      createProductBody,
      productId
    );
  });
});
