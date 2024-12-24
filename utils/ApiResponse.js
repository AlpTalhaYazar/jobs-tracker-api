import { ErrorCode } from "./ErrorCode.js";

export class ApiResponse {
  constructor() {
    this.success = false;
    this.data = null;
    this.message = "";
    this.error = new ErrorDetails();
  }

  static async ToApiResponse(operationResult, message = "") {
    if (operationResult.isSuccess) {
      const apiResponse = new ApiResponse();
      apiResponse.success = true;
      apiResponse.data = operationResult.data;
      return apiResponse;
    }

    const apiResponse = new ApiResponse();
    apiResponse.success = false;
    apiResponse.message = message;
    apiResponse.error.code = operationResult.errorCode;
    apiResponse.error.message = operationResult.errorMessage;
    apiResponse.error.details = operationResult.errorDetails;
    return apiResponse;
  }
}

export class ErrorDetails {
  constructor() {
    this.code = ErrorCode.None;
    this.message = "";
    this.details = [];
  }
}

export class PaginatedApiResponse extends ApiResponse {
  constructor() {
    this.metaData = new PaginationMetaData();
  }
}

export class PaginationMetaData {
  constructor() {
    this.page = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.totalPages = 0;
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.totalPages;
  }

  static async ToApiResponse(paginatedOperationResult, message = "") {
    if (paginatedOperationResult.isSuccess) {
      const apiResponse = new PaginatedApiResponse();
      apiResponse.success = true;
      apiResponse.data = paginatedOperationResult.data;
      apiResponse.metaData = paginatedOperationResult.metaData;
      return apiResponse;
    }

    const apiResponse = new PaginatedApiResponse();
    apiResponse.success = false;
    apiResponse.message = message;
    apiResponse.error.code = paginatedOperationResult.errorCode;
    apiResponse.error.message = paginatedOperationResult.errorMessage;
    apiResponse.error.details = paginatedOperationResult.errorDetails;
    return apiResponse;
  }
}
