import { Router } from 'express';
import * as electionCandidate from './services/election-candidate-service';
import * as electionInitiative from './services/election-initiative-service';
import * as electionOffice from './services/election-office-service';
import * as election from './services/election-service';
import * as initiativeOption from './services/initiative-option-service';
import * as session from './services/session-service';
import * as societyMember from './services/society-member-service';
import * as user from './services/user-service';
import * as ballot from './services/ballot-service';
import { auth } from './middleware/auth';

const router = Router();

// Auth
router.post('/auth/login', user.login);
router.post('/auth/logout', auth(), session.remove);
router.get('/auth/session', auth(), session.retrieve);

// Elections
router.get('/v1/elections', auth('list_elections'), election.list);
router.post('/v1/elections', auth('create_election'), election.create);
router.put('/v1/elections/:election_id', auth('update_election'), election.update);
router.get('/v1/elections/:election_id', auth('retrieve_election'), election.retrieve);

// Ballots
router.get('/v1/elections/:election_id/ballot', auth('retrieve_ballot'), ballot.retrieve);
router.post('/v1/elections/:election_id/ballot', auth('submit_ballot'), ballot.submit);

// Offices
router.get('/v1/elections/:election_id/election_offices', auth('list_offices'), electionOffice.list);
router.post('/v1/elections/:election_id/election_offices', auth('create_office'), electionOffice.create);

// Candidates
router.get('/v1/elections/:election_id/election_candidates', auth('list_candidates'), electionCandidate.list);
router.post('/v1/elections/:election_id/election_candidates', auth('create_candidate'), electionCandidate.create);

// Election Initiatives
router.get('/v1/elections/:election_id/election_initiatives', auth('list_initiatives'), electionInitiative.list);
router.post('/v1/elections/:election_id/election_initiatives', auth('create_initiative'), electionInitiative.create);

// Initiative Options
router.get('/v1/elections/:election_id/initiative_options', auth('list_initiative_options'), initiativeOption.list);
router.post('/v1/elections/:election_id/initiative_options', auth('create_initiative_option'), initiativeOption.create);

// Society Members
router.get('/v1/society_members/:society_id', auth('list_society_members'), societyMember.list);
router.post('/v1/society_members/:society_id', auth('create_society_member'), societyMember.create);

// Admin endpoint to list societies

export { router };
