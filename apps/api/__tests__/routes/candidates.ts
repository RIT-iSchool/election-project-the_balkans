import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, officerLogin } from './auth';

describe('GET /v1/elections/:election_id/election_candidates', () => {
  let userToken: string | undefined;
  let adminToken: string | undefined;
  let societyId: number;

  beforeAll(async () => {
    userToken = await officerLogin();
    adminToken = await adminLogin();
    societyId = 5;
  });
});
