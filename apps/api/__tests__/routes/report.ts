import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, userLogin } from './auth';

describe('GET /v1/report/society', () => {
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    societyId = 1;
  });

  it('Admin gets report data for society', async () => {
    const response = await request(server)
      .get('/v1/report/society')
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        activeBallots: expect.any(Number),
        inActiveBallots: expect.any(Number),
        societyUsers: expect.any(Number),
        averageVotingMembers: null,
      }),
    );
  });
});

afterAll(() => {
  server.close();
});
