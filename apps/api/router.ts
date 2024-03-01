import { Router } from 'express';
import * as candidateVote from './src/services/candidate-vote-service';
import * as electionCandidate from './src/services/election-candidate-service';
import * as electionInitiative from './src/services/election-initiative-service';
import * as electionOffice from './src/services/election-office-service';
import * as election from './src/services/election-service';
import * as initiativeOption from './src/services/initiative-option-service';
import * as initiativeVote from './src/services/initiative-vote-service';
import * as session from './src/services/session-service';
import * as societyMember from './src/services/society-member-service';
import * as society from './src/services/society-service';
import * as user from './src/services/user-service';

export const router = Router();

//auth
router.get('/auth/login', user.login);
router.post('/auth/logout', session.remove);
router.get('/auth/session', session.retrieve);
router.get('/auth/society', society.retrieve);

//v1
router.get('/v1/elections', election.list);
router.post('/v1/elections', election.create);
router.put('/v1/elections/:electionId', election.update);
router.get('/v1/elections/:electionId', election.retrieve);
//router.get('/v1/elections/{election_id}/ballot', ballot.retrieve);
//router.post('/v1/elections/{election_id}/ballot', ballot.submit);
router.get('/v1/elections/{election_id}/election_offices', electionOffice.list);
router.get(
  '/v1/elections/{election_id}/election_offices',
  electionOffice.create,
);
router.get(
  '/v1/elections/{election_id}/election_candidates',
  electionCandidate.list,
);
router.post(
  '/v1/elections/{election_id}/election_candidates',
  electionCandidate.create,
);
router.get(
  '/v1/elections/{election_id}/election_initiatives',
  electionInitiative.list,
);
router.post(
  '/v1/elections/{election_id}/election_initiatives',
  electionInitiative.create,
);
