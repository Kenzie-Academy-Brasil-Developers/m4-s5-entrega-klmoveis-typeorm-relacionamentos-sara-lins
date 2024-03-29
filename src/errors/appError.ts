export class AppError extends Error {
  statusCode;

  constructor(statusCode: number = 400, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/* export const handleError = (err: AppError, res: Response) => {
    const {statusCode, message} = err;

    return res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}; */
