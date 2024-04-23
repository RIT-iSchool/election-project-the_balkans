// import request from 'supertest';
// import { server } from '../../src/server';
// import { adminLogin, userLogin } from './auth';

// describe('GET /v1/elections/:election_id/ballot', () => {
//   let authToken: string | undefined;

//   beforeAll(async () => {
//     authToken = await userLogin();
//   });
//   it('User gets ballot info for an election in his society', async () => {
//     const response = await request(server)
//       .get('/v1/elections/451/ballot')
//       .set('Cookie', authToken || '')
//       .set('x-society-id', '19')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200);

//     const expectedResponseStructure = {
//       id: expect.any(Number),
//       name: expect.any(String),
//       startDate: expect.any(String),
//       endDate: expect.any(String),
//       societyId: expect.any(Number),
//       photoURL: expect.any(String), // or null
//       offices: expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           electionId: expect.any(Number),
//           societyId: expect.any(Number),
//           officeName: expect.any(String),
//           maxVotes: expect.any(Number),
//           candidates: expect.arrayContaining([expect.any(Object)]),
//         }),
//       ]),
//       initiatives: expect.arrayContaining([expect.any(Object)]),
//     };
//     expect(response.body).toEqual(expectedResponseStructure);
//   });
// });
