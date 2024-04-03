import request from 'supertest';
import { server } from '../../src/server';

describe('POST /auth/login', () => {
  it('allows a user to login with valid credentials', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({
        email: 'connor@admin.com',
        password: 'admin123',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        token: expect.any(String),
        expiresAt: expect.any(String),
      }),
    );
  });

  it('denies a user who logs in with invalid credentials', async () => {
    await request(server)
      .post('/auth/login')
      .send({
        email: 'connor@admin.com',
        password: 'notmypassword',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

describe('POST /auth/logout', () => {
  it('logs a user in and then logs out successfully', async () => {
    const response = await request(server)
      .post('/auth/login')
      .send({
        email: 'connor@admin.com',
        password: 'admin123',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    await request(server)
      .post('/auth/logout')
      .set('Accept', 'application/json')
      .set('Cookie', `session=${response.body.token};`)
      .expect(202);
  });

  it('fails to log out in an unauthenticated state', async () => {
    await request(server)
      .post('/auth/logout')
      .set('Accept', 'application/json')
      .expect(401);
  });
});

afterAll(() => {
  server.close();
});
