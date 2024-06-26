export interface ApiResponse<T> {
  message: string
  status: "error" | "success"
  data?: T
  statusCode: number
}

export class ResponseHandler<T> {
  public static success<T>(
    data: T,
    message = "Success",
    statusCode = 200
  ): ApiResponse<T> {
    return {
      message,
      status: "success",
      data,
      statusCode,
    }
  }

  public static error(
    message = "Error",
    statusCode = 500,
    data?: any
  ): ApiResponse<any> {
    return {
      message,
      status: "error",
      data,
      statusCode,
    }
  }
}
