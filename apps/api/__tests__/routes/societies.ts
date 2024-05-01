import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin } from './auth';

describe('GET /v1/societies', () => {
  let authToken: string | undefined;

  beforeAll(async () => {
    authToken = await adminLogin();
  });

  it('Admin is able to retrieve list of societies', async () => {
    const response = await request(server)
      .get('/v1/societies')
      .set('Cookie', authToken || '')
      .set('x-society-id', '1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        currentPage: expect.any(Number),
        data: expect.arrayContaining([
          expect.objectContaining({
            owner: expect.any(Object),
            id: expect.any(Number),
            name: expect.any(String),
            ownerId: expect.any(Number),
          }),
        ]),
        hasMore: expect.any(Boolean),
        nextPage: expect.any(Number),
        totalCount: expect.any(Number),
      }),
    );
  });
});

describe('GET /v1/societies/:society_id', () => {
  let authToken: string | undefined;

  beforeAll(async () => {
    authToken = await adminLogin();
  });

  it('Admin is able to retrieve society by id', async () => {
    const response = await request(server)
      .get('/v1/societies/6')
      .set('Cookie', authToken || '')
      .set('x-society-id', '6')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        // owner: expect.any(Object), // Ensure owner is an object (either with details or null)
        id: expect.any(Number), // Ensure id is a number
        name: expect.any(String), // Ensure name is a string
        ownerId: expect.any(Number),
      }),
    );
  });
});

afterAll(() => {
  server.close();
});
