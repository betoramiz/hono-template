import { type ErrorResponse, ErrorsCode } from "./ErrorTypes.js";

export class AppError {

  static BadRequest(message: string): ErrorResponse {
    return {
      statusCode: ErrorsCode.BAD_REQUEST,
      message: message
    };
  }

  static NotFound(message: string): ErrorResponse {
    return {
      statusCode: ErrorsCode.NOT_FOUND,
      message: message
    };
  }
}