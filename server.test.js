const request = require('supertest');
const app = require('../server');

describe('PixelArena Gaming Website API', () => {
  test('GET /api/health should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/games should return a list of games', async () => {
    const res = await request(app).get('/api/games');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title');
  });

  test('GET / should serve the homepage', async () => {
    const res = await request(app).get('/index.html');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('PixelArena');
  });
});
