import { describe, it } from "@jest/globals";
import * as request from "../../Resources/Requests/Carts/CompletePurchaseRequests";
import * as responseBody from "../../Objects/Carts/CompletePurchaseResponseBody";
import * as validator from "../../Validators/Carts/CompletePurchaseValidator";
import { CreateUserRequest } from "../../Objects/Users/CreateUserRequestBody";
import { createUserBody } from "../../Data/Bodies/Users/CreateUserBodies";
import { createUser } from "../../Resources/Requests/Users/CreateUserRequests";
import { CreateUserResponse } from "../../Objects/Users/CreateUserResponseBody";
import { LoginRequest } from "../../Objects/Login/LoginRequestBody";
import { loginBody } from "../../Data/Bodies/Login/LoginBodies";
import { login } from "../../Resources/Requests/Login/LoginRequests";
import { LoginResponse } from "../../Objects/Login/LoginResponseBody";
import { CreateProductRequestBody } from "../../Objects/Products/CreateProductRequestBody";
import { createProductBody } from "../../Data/Bodies/Products/CreateProductBodies";
import { createProduct } from "../../Resources/Requests/Products/CreateProductRequests";
import { deleteUser } from "../../Resources/Requests/Users/DeleteUserRequests";
import { deleteProduct } from "../../Resources/Requests/Products/DeleteProductRequests";
import { addToCart } from "../../Resources/Requests/Carts/AddToCartRequests";
import { addToCartBody } from "../../Data/Bodies/Carts/AddToCartBodies";
import { getProducts } from "../../Resources/Requests/Products/GetProductRequests";

describe("Complete Purchase Tests", () => {
  let userId: string;
  let token: string;
  let productQuantity: number;
  let productId: string;

  beforeEach(async () => {
    // Create a user
    const newUserBody: CreateUserRequest = createUserBody();
    newUserBody.administrador = "true";
    const createUserResponse = await createUser(newUserBody);
    const createUserResponseBody: CreateUserResponse = createUserResponse.body;
    userId = createUserResponseBody._id;
    expect(createUserResponse.status).toBe(201);

    // Login the user
    const loginRequestBody: LoginRequest = loginBody(
      newUserBody.email,
      newUserBody.password
    );
    const loginResponse = await login(loginRequestBody);
    const loginResponseBody: LoginResponse = loginResponse.body;
    token = loginResponseBody.authorization;
    expect(loginResponse.status).toBe(200);

    // Create a product
    const newProductBody: CreateProductRequestBody = createProductBody();
    productQuantity = newProductBody.quantidade;
    const createProductResponse = await createProduct(newProductBody, token);
    const createProductResponseBody = createProductResponse.body;
    productId = createProductResponseBody._id;
    expect(createProductResponse.status).toBe(201);

    // Add the product to the cart
    const addProductToCartBody = addToCartBody(productId);
    const addToCartResponse = await addToCart(addProductToCartBody, token);
    expect(addToCartResponse.status).toBe(201);
  });

  afterEach(async () => {
    // Delete the product
    if (productId) {
      await deleteProduct(productId, token);
    }

    // Delete the user
    if (userId) {
      await deleteUser(userId);
    }
  });

  it("should complete a purchase", async () => {
    // Complete the purchase
    const completePurchaseResponse = await request.completePurchase(token);
    const completePurchaseResponseBody: responseBody.CompletePurchaseResponseBody =
      completePurchaseResponse.body;

    // Validate the response
    expect(completePurchaseResponse.status).toBe(200);
    validator.validateCompletePurchaseResponse(completePurchaseResponseBody);

    // Validate the product quantity
    const getProductByIdResponse = await getProducts(productId);
    const getProductByIdResponseBody = getProductByIdResponse.body;
    const product = getProductByIdResponseBody.produtos[0];
    expect(product.quantidade).toBe(productQuantity - 1);
  });
});
