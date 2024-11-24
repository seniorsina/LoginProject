class ApiResponse {
  status: string;
  message: string;
  statusCode: number;
  data: any | null;

  constructor(
    status: string,
    message: string,
    statusCode: number,
    data: any[]
  ) {
    this.status = status;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  static success(message: string, data: any = null): ApiResponse {
    return new ApiResponse("success", message, 200, data);
  }

  static fail(message: string, data: any = null): ApiResponse {
    return new ApiResponse("fail", message, 400, data);
  }

  static error(message: string, data: any = null): ApiResponse {
    return new ApiResponse("error", message, 500, data);
  }

  static response(
    status: string,
    message: string,
    statusCode: number,
    data: any = null
  ): ApiResponse {
    return new ApiResponse(status, message, statusCode, data);
  }
}

export default ApiResponse;