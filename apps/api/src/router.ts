import { Router } from 'express';
import * as candidateVote from './services/candidate-vote-service';
import * as electionCandidate from './services/election-candidate-service';
import * as electionInitiative from './services/election-initiative-service';
import * as electionOffice from './services/election-office-service';
import * as election from './services/election-service';
import * as initiativeOption from './services/initiative-option-service';
import * as initiativeVote from './services/initiative-vote-service';
import * as session from './services/session-service';
import * as societyMember from './services/society-member-service';
import * as society from './services/society-service';
import * as user from './services/user-service';
import { auth } from './middleware/auth';

const router = Router();

//auth
router.post('/auth/login', user.login);
router.post('/auth/logout', auth(false), session.remove);
router.get('/auth/session', auth(false), session.retrieve);
router.get('/auth/society', auth(false), society.retrieve);

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

export { router };