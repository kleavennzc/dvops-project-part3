const request = require('supertest');
const { app, server } = require('../index'); 

// Close server after tests
afterAll((done) => {
  server.close(done);
});

describe('View Post API Endpoints', () => {
  it('GET /posts/:id should return 200/404 but NOT 500', async () => {

    const res = await request(app).get('/posts/1'); 
    expect(res.status).not.toBe(500);
  });

  it('GET /posts/abc should return 400', async () => {
    const res = await request(app).get('/posts/abc');
    expect(res.status).toBe(400);
  });
});