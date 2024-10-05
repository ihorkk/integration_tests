import * as responseBody from "../../Objects/Common/CommonResponse";

export function validateErrorResponse(
  response: responseBody.ErrorResponse,
  expectedMessage: string
) {
  expect(response.message).toBe(expectedMessage);
}
