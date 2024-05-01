import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin } from './auth';
import { set } from 'zod';

describe('PUT /v1/society_members/:member_id', () => {
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    societyId = 12;
  });

  it("Admin is able to update society member's role", async () => {
    const response = await request(server)
      .put('/v1/society_members/1')
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .send({
        role: 'member',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        societyId: expect.any(Number),
        role: expect.any(String),
      }),
    );
  });
});
