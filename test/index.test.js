const request = require('supertest');
const app = require('../config/express');

describe('Test the root', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
