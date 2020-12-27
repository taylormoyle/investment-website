const ajax = require('axios');

function withEndpoint(path) {
    const endpoint = '/service';
    console.log(`client.js: endpoint ${endpoint}`);
    let relativePath = path;
    if (path.startsWith('/')) {
        relativePath = path.substr(1);
    }
    const result = `${endpoint}/${relativePath}`;
    console.log(`client request to: ${result}`);
    return result;
}

async function postJsonAcceptJson(path, request, query) {
    const response = await ajax.post(withEndpoint(path), request ? JSON.stringify(request) : null, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        params: query,
    });
    return response.data;
}

class Investment {
    constructor(options, context) {
        this.options = options;
        this.context = context;
    }

    async qualify(request) {
        console.log('client.js qualify investment: request: %o', request);
        const response = postJsonAcceptJson('/investment/qualify', request);
        console.log(`client.js response: ${response}`)
        return true;
    }
}

class Client {
    constructor() {
        this.investment = new Investment();
    }
}

export { Client };
