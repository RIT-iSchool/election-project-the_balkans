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

// Auth
router.post('/auth/login', user.login);
router.post('/auth/logout', auth(), session.remove);
router.get('/auth/session', auth(), session.retrieve);
router.get('/auth/society', auth('member'), society.retrieve);

// Elections
router.get('/v1/elections', auth('member'), election.list);
router.post('/v1/elections', auth('officer'), election.create);
router.put('/v1/elections/:electionId', auth('officer'), election.update);
router.get('/v1/elections/:electionId', auth('member'), election.retrieve);

// Ballots
//router.get('/v1/elections/{election_id}/ballot', ballot.retrieve);
//router.post('/v1/elections/{election_id}/ballot', ballot.submit);

// Offices
router.get('/v1/elections/:election_id/election_offices', auth('officer'), electionOffice.list);
router.get('/v1/elections/:election_id/election_offices', auth('officer'), electionOffice.create);

// Candidates
router.get('/v1/elections/:election_id/election_candidates', auth('officer'), electionCandidate.list);
router.post('/v1/elections/:election_id/election_candidates', auth('officer'), electionCandidate.create);

// Candidate Votes
router.get('/v1/elections/:election_id/candidate_vote', auth('officer'), candidateVote.list);
router.post('/v1/elections/:election_id/candidate_vote', auth('officer'), candidateVote.create);

// Election Initiatives
router.get('/v1/elections/:election_id/election_initiatives', auth('officer'), electionInitiative.list);
router.post('/v1/elections/:election_id/election_initiatives', auth('officer'), electionInitiative.create);

// Initiative Options
router.get('/v1/elections/:election_id/initiative_options', auth('officer'), initiativeOption.list);
router.post('/v1/elections/:election_id/initiative_options', auth('officer'), initiativeOption.create);

// Initiative Votes
router.get('/v1/elections/:election_id/initiative_vote', auth('officer'), initiativeVote.list);
router.post('/v1/elections/:election_id/initiative_vote', auth('officer'), initiativeVote.create);

// Society Members
router.get('/v1/society_members/:society_id/:society_member_id', auth('admin'), societyMember.retrieve);
router.post('/v1/society_members/:society_id', auth('admin'), societyMember.create);

export { router };
