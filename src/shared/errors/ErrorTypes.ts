export const ErrorsCode = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
};

export type ErrorResponse = {
  statusCode: number;
  message?: string;
}

