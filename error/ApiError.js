

class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;

    }
    code = 500;
    message = 'Something went wrong.';

    static badRequest(msg) {
        return new ApiError(400, msg)
    }

    static internal(msg) {
        return new ApiError(500, msg)
    }

    static userNotFound(msg) {
        return new ApiError(404, msg || 'User not found.')
    }

    static missingParameter(msg) {
        return new ApiError(404, msg || 'Missing required parameters.')
    }

    static gameHasAlreayFinished(msg) {
        return new ApiError(404, msg || 'Game has already finished.')
    }
}

module.exports = ApiError