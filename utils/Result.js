export class Result {
  constructor(isSuccess, data, error) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.error = error;
  }

  static success(data) {
    return new Result(true, data, null);
  }

  static failure(error) {
    return new Result(false, null, error);
  }
}

export class PaginationResult extends Result {
  constructor(data, page, limit, total) {
    super(true, data, null);
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrevious = page > 1;
  }

  static create(data, page, limit, total) {
    return new PaginationResult(data, page, limit, total);
  }
}
