export const createResponseAdapter = (statusCode, body) => ({
    statusCode: statusCode,
    body: JSON.stringify(body)
});
