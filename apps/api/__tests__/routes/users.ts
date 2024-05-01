import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, employeeLogin, officerLogin, userLogin } from './auth';

// LIST USERS
describe('GET /v1/users', () => {
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
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
      expect.arrayContaining([
        expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
        }),
      ]),
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

// UPDATE USER
describe('PUT /v1/user/:user_id', () => {
  let authToken: string | undefined;
  let societyID = 6;

  beforeAll(async () => {
    authToken = await adminLogin(); // Use the login function to obtain the authentication token
  });

  it('Admin updates a user', async () => {
    const response = await request(server)
      .put('/v1/user/5000') // not done
      .set('Cookie', authToken || '')
      .set('x-society-id', societyID.toString())
      .set('Accept', 'application/json')
      .send({
        email: 'test@email.com',
        password: 'test',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(200);

    if (response.body === undefined) {
      expect(response.body).toBeUndefined();
    } else {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 5000,
          email: 'test@email.com',
          password: 'test',
          firstName: 'John',
          lastName: 'Doe',
        }),
      );
    }
  });
});

// RETRIEVE USER
describe('GET /v1/user/:user_id', () => {
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
  });

  it('Admin gets the data for a user', async () => {
    const response = await request(server)
      .get('/v1/user/5000')
      .set('Cookie', adminToken || '') // Set authorization header with the obtained token
      .set('x-society-id', societyId.toString()) // Set society ID header
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 5000,
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        admin: expect.any(Boolean),
      }),
    );
  });
});


afterAll(() => {
    server.close();
  });