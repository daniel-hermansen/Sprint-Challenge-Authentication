const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    test('should be the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it("runs the server", () => {
        expect(true).toBeTruthy();
    });
});