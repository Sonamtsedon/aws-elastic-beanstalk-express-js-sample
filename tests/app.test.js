const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    test('should return Hello World with status 200', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});
