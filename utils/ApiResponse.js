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
    super();
    this.paginationMetaData = new PaginationMetaData();
  }

  static async ToApiResponse(paginatedOperationResult, message = "") {
    if (paginatedOperationResult.isSuccess) {
      const apiResponse = new PaginatedApiResponse();
      apiResponse.success = true;
      apiResponse.data = paginatedOperationResult.data;
      apiResponse.paginationMetaData = new PaginationMetaData(
        paginatedOperationResult.paginationMetaData.page,
        paginatedOperationResult.paginationMetaData.pageSize,
        paginatedOperationResult.paginationMetaData.totalCount
      );
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

export class PaginationMetaData {
  constructor(page, pageSize, totalCount) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.hasPrevious = page > 1;
    this.hasNext = page < this.totalPages;
  }
}
