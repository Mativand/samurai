class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(404, message);
    };

    static internal(message = 'Internal error') {
        return new ApiError(500, message);
    };

    static forbidden(message) {
        return new ApiError(403, message);
    };
}

module.exports = ApiError;