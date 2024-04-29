import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, officerLogin, employeeLogin } from './auth';
import { electionCandidate } from '../../src/db/schema';

describe('GET /v1/elections/:election_id/election_candidates', () => {
  let officerToken: string | undefined;
  let adminToken: string | undefined;
  let employeeToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    officerToken = await officerLogin();
    adminToken = await adminLogin();
    employeeToken = await employeeLogin();
    societyId = 1;
  });
  it('Admin can list candidates for any society', async () => {
    const response = await request(server)
      .get('/v1/elections/25/election_candidates')
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: expect.any(String),
          electionOfficeId: expect.any(Number),
          id: expect.any(Number),
          name: expect.any(String),
          photoURL: null,
          societyId: expect.any(Number),
        }),
      ]),
    );
  });
});
