// Just some shared stuff between all the functions so we only have to change it in one location
export const tableName = 'movies';

export const headers = {
    "Content-Type": "application/json",
};

// TODO: delete the ones we don't use later
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    GONE: 410,
    TEAPOT: 418,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
}

export const buildReponse = (body, statusCode) => {
    return {
        statusCode: statusCode ?? HTTP_STATUS.OK,
        body: JSON.stringify(body ?? {}),
        headers: {
            "Content-Type": "application/json",
        }
    }
}

export const isValidString = (maybeStr) => {
    return !(!maybeStr || typeof maybeStr !== 'string' || maybeStr.length <= 0)
}