import request from 'supertest';
import { server } from '../../src/server';

describe('GET /v1/elections', () => {
  let authToken: string | undefined; // Explicitly typing authToken as string
  let societyId: number; // Assuming societyId is of type number

  beforeAll(async () => {
    // Log in a user and obtain the authentication token
    const loginResponse = await request(server)
      .post('/auth/login')
      .send({
        email: 'shpend.ismaili1@gmail.com',
        password: 'shpend123',
      })
      .set('Accept', 'application/json');

    authToken = loginResponse.headers['set-cookie']?.[0]; // Extract the authentication token

    // Set society ID
    societyId = 5;
  });

  it('gets the election data for a specific society', async () => {
    const response = await request(server)
      .get('/v1/elections')
      .set('Cookie', authToken || '') // Set authorization header with the obtained token
      .set('x-society-id', societyId.toString()) // Set society ID header
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          startDate: expect.any(String),
          endDate: expect.any(String),
          societyId: expect.any(Number),
          photoURL: null,
        }),
      ]),
    );
  });
});

afterAll(() => {
  server.close();
});
