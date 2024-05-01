import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, employeeLogin, officerLogin, userLogin } from './auth';

// LIST USERS
describe('GET /v1/users', () => {
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    societyId = 1;
  });

  it('Admin gets the all user data for all societies', async () => {
    const response = await request(server)
      .get('/v1/users')
      .set('Cookie', adminToken || '') // Set authorization header with the obtained token
      .set('x-society-id', societyId.toString()) // Set society ID header
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        currentPage: 1,
        data: expect.any(Array),
        hasMore: true,
        nextPage: 2,
        totalCount: expect.any(Number),
      }),
    );
  });
});

// CREATE USER
describe('POST /v1/user', () => {
  let societyId = 19;
  it('creates a new user', async () => {
    const authToken = await adminLogin();

    const response = await request(server)
      .post('/v1/user')
      .send({
        email: 'test@email.com',
        password: 'test',
        firstName: 'Test',
        lastName: 'Jones',
        admin: false,
      })
      .set('Cookie', authToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual({
      email: 'test@email.com',
      password: 'test',
      firstName: 'Test',
      id: expect.any(Number),
      lastName: 'Jones',
      admin: false,
    });
  });

  it('handles errors correctly when societyID is missing', async () => {
    const authToken = await adminLogin(); // Obtain authentication token

    await request(server)
      .post('/v1/elections')
      .send({
        email: 'test@email.com',
        password: 'test',
        firstName: 'Test',
        lastName: 'Jones',
        admin: false,
      })
      .set('Cookie', authToken || '') // Set authentication cookie
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

afterAll(() => {
  server.close();
});
