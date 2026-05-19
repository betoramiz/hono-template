import { AppError } from "@shared/errors/AppError.js";

export const userNotFoundError = (message?: string) => AppError.NotFound(message ?? 'User Not Found');