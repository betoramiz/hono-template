import type { AwilixContainer } from "awilix";

declare module "hono" {
  interface ContextVariableMap {
    container: AwilixContainer;
  }
}
