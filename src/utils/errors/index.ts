enum StatusCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

class BaseError extends Error {
    public readonly status: StatusCodes;

    constructor(message: string, status: StatusCodes) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.status = status;

        Error.captureStackTrace(this);
    }
}

// Use this when the server request syntax or data is malformed
class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

// Use this for when the request lacks credentials
class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

// Use this when the client is authenticated but the action is not allowed
class ForbiddenError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.FORBIDDEN);
    }
}

// Use this when the requested URI or data could not be found
class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

// Internal Server Error
class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, StatusCodes.INTERNAL_SERVER);
    }
}

export { StatusCodes, BaseError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError };