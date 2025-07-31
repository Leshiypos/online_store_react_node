class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message || "Bad Request");
  }

  static internal(message) {
    return new ApiError(500, message || "Internal Server Error");
  }

  static forbidden(message) {
    return new ApiError(403, message || "Forbidden");
  }
}

module.exports = ApiError;
