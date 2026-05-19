import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { type ErrorResponse, ErrorsCode } from "@shared/errors/ErrorTypes.js";

export const toErrorResponse = (c: Context, error: ErrorResponse) => {
  switch (error.statusCode) {
    case ErrorsCode.BAD_REQUEST:
      return c.json({ error: error.message ?? "Bad Request" }, error.statusCode as ContentfulStatusCode);
    case ErrorsCode.NOT_FOUND:
      return c.json({ error: error.message ?? "Not Found" }, error.statusCode as ContentfulStatusCode);
    case ErrorsCode.INTERNAL_SERVER_ERROR:
      return c.json({ error: error.message ?? "Error de servidor" }, error.statusCode as ContentfulStatusCode);
    default:
      return c.json({ error: "Error interno del servidor" }, 500);
  }
}