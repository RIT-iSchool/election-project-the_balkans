import request from 'supertest';
import { server } from '../../src/server';
import { adminLogin, officerLogin, employeeLogin } from './auth';
import { electionCandidate, electionOffice } from '../../src/db/schema';

describe('GET /v1/elections/:election_id/election_offices/:office_id/election_candidates', () => {
  let officerToken: string | undefined;
  let adminToken: string | undefined;
  let employeeToken: string | undefined;
  let societyId: number;
  let electionId: number;
  let officeId: number;

  beforeAll(async () => {
    officerToken = await officerLogin();
    adminToken = await adminLogin();
    employeeToken = await employeeLogin();
    societyId = 19;
    electionId = 475;
    officeId = 1209;
  });
  it('Admin can list candidates for any society', async () => {
    const response = await request(server)
      .get(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
      )
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

  it('Officer can list candidates for an election in their own society', async () => {
    const response = await request(server)
      .get(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
      )
      .set('Cookie', officerToken || '')
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

  it('Employee can list candidates for their own society', async () => {
    const response = await request(server)
      .get(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
      )
      .set('Cookie', employeeToken || '')
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

describe('POST /v1/elections/:election_id/election_offices/:office_id/election_candidates', () => {
  let adminToken: string | undefined;
  let employeeToken: string | undefined;
  let societyId: number;
  let electionId: number;
  let officeId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    employeeToken = await employeeLogin();
    societyId = 19;
    electionId = 475;
    officeId = 1209;
  });

  it('Employee is able to create a new candidate for a given election in their society', async () => {
    const response = await request(server)
      .post(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
      )
      .send({
        name: 'Cooper Stevens',
        electionOfficeId: 1209,
        description: 'I gave up online dating',
      })
      .set('Cookie', employeeToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });

  it('Admin is able to create a new candidate for a given election', async () => {
    const response = await request(server)
      .post(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
      )
      .send({
        name: 'Evan Gadd',
        electionOfficeId: 1209,
        description: 'I am the Devops Guy',
      })
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });
});

describe('PUT /v1/elections/:election_id/election_offices/:office_id/election_candidates/:candidate_id', () => {
  let adminToken: string | undefined;
  let employeeToken: string | undefined;
  let societyId: number;
  let electionId: number;
  let officeId: number;
  let candidateId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    employeeToken = await employeeLogin();
    societyId = 19;
    electionId = 475;
    candidateId = 3006;
    officeId = 1209;
  });

  it('Employee is able to update candidate data for a given election in their society', async () => {
    const response = await request(server)
      .put(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
      )
      .send({
        name: 'Juani',
        description:
          'My name is Juan Howard and I am the best candidate for this office and I gave up online dating.',
      })
      .set('Cookie', employeeToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });

  it('Admin is able to update candidate data for a given election in their society', async () => {
    const response = await request(server)
      .put(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
      )
      .send({
        name: 'Juani',
        description:
          'My name is Juan Howard and I am the best candidate for this office and I gave up online dating.',
      })
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });
});

describe('GET /v1/elections/:election_id/election_offices/:office_id/election_candidates/:candidate_id', () => {
  let adminToken: string | undefined;
  let employeeToken: string | undefined;
  let societyId: number;
  let electionId: number;
  let officeId: number;
  let candidateId: number;

  beforeAll(async () => {
    adminToken = await adminLogin();
    employeeToken = await employeeLogin();
    societyId = 19;
    electionId = 475;
    candidateId = 3006;
    officeId = 1209;
  });
  it('Admin can retrieve candidate data for any society', async () => {
    const response = await request(server)
      .get(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
      )
      .set('Cookie', adminToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });

  it('Employee can retrieve candidate data for an election in their own society', async () => {
    const response = await request(server)
      .get(
        `/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
      )
      .set('Cookie', employeeToken || '')
      .set('x-society-id', societyId.toString())
      .set('Accept', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        electionOfficeId: expect.any(Number),
        id: expect.any(Number),
        name: expect.any(String),
        photoURL: null,
        societyId: expect.any(Number),
      }),
    );
  });
});

afterAll(() => {
  server.close();
});
