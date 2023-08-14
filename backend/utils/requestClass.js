class Request {
    constructor(url, method = 'GET', headers = {}, body = null) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }

    async send() {
        try {
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.body,
            });

            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new Error(data.error || 'Request failed');
            }
        } catch (error) {
            throw new Error(`Request error: ${error.message}`);
        }
    }
}
