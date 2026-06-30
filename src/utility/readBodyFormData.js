export function readBodyFormData(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            resolve(formData);
        })
    })
}