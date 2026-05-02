import type { Context } from "hono";

type TaggedError = {
  _tag: string;
  message?: string;
};

export function errorToResponse(c: Context, error: TaggedError) {
  switch (error._tag) {
    case "InvalidDomainError":
      return c.json({ error: error.message ?? "Error de dominio" }, 400);
    default:
      return c.json({ error: "Error interno del servidor" }, 500);
  }
}
