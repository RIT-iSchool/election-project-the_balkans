import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, userLogin } from './auth';

describe('GET /v1/elections/:election_id/election_offices', () => {
  let authToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    authToken = await adminLogin(); // Use the login function to obtain the authentication token
    societyId = 5;
  });

  it('Admin is able to list offices for a given election', async () => {
    const response = await request(server)
      .get('/v1/elections/125/election_offices')
      .set('Cookie', authToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          electionId: expect.any(Number),
          officeName: expect.any(String),
          maxVotes: expect.any(Number),
          societyId: expect.any(Number),
        }),
      ]),
    );
  });
});

describe('POST /v1/elections/:election_id/election_offices', () => {
  let authToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    authToken = await adminLogin(); // Use the login function to obtain the authentication token
    societyId = 5;
  });

  it('Admin is able to create a new office for a given election', async () => {
    const response = await request(server)
      .post('/v1/elections/125/election_offices')
      .send({
        // id: 5003, // need to provide id, default isnt working currently.
        electionId: 125,
        officeName: 'Scrum Master',
        maxVotes: 1,
        societyId: 5,
      })
      .set('Cookie', authToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        electionId: expect.any(Number),
        officeName: expect.any(String),
        maxVotes: expect.any(Number),
        societyId: expect.any(String),
      }),
    );
  });
});
