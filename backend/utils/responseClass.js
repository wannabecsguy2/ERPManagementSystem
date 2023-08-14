class Response {
    constructor(statusCode, headers, data, error, message) {
        this.statusCode = statusCode;
        this.error = error
        this.headers = headers;
        this.data = data;
        this.message = message;
    }
    getHeader(headerName){

    }
}

module.exports = Response;