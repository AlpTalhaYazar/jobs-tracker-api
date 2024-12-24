import { ErrorCode } from "./ErrorCode.js";

export class OperationResult {
  constructor() {
    this.isSuccess = false;
    this.data = null;
    this.errorCode = ErrorCode.None;
    this.errorMessage = "";
    this.errorDetails = [];
  }

  static async Success(data) {
    const result = new OperationResult();
    result.isSuccess = true;
    result.data = data;
    return result;
  }

  static async Failure(errorCode, errorMessage) {
    const result = new OperationResult();
    result.errorCode = errorCode;
    result.errorMessage = errorMessage;
    return result;
  }

  static async Failure(errorCode, errorMessage, errorDetails) {
    const result = new OperationResult();
    result.errorCode = errorCode;
    result.errorMessage = errorMessage;
    result.errorDetails = errorDetails;
    return result;
  }
}

export class PaginatedOperationResult extends OperationResult {
  constructor() {
    this.metaData = null;
  }

  static async Success(data, metaData) {
    this.isSuccess = true;
    this.data = data;
    this.metaData = metaData;
    return this;
  }
}

export class PaginationMetaData {
  constructor() {
    this.page = 1;
    this.pageSize = 10;
    this.totalCount = 0;
    this.totalCount = 0;
    this.totalPages = 0;
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.totalPages;
  }
}
