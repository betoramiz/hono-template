import { defineConfig } from 'drizzle-kit';
import { config } from "../../config.js";

export default defineConfig({
  out: './src/infrastructure/drizzle',
  schema: './src/infrastructure/persistence/schemas/*.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.DATABASE_URL
  }
});