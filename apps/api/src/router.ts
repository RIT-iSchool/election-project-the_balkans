import { Router } from 'express';
import * as electionCandidate from './services/election-candidate-service';
import * as electionInitiative from './services/election-initiative-service';
import * as electionOffice from './services/election-office-service';
import * as election from './services/election-service';
import * as initiativeOption from './services/initiative-option-service';
import * as session from './services/session-service';
import * as societyMember from './services/society-member-service';
import * as userService from './services/user-service';
import * as ballot from './services/ballot-service';
import * as society from './services/society-service';
import * as system from './services/system-service';
import { auth } from './middleware/auth';
import { user } from './middleware/user';

const router = Router();

// Auth
router.post('/auth/login', userService.login);
router.post('/auth/logout', user(), session.remove);
router.get('/auth/session', user(), session.retrieve);

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
router.get('/v1/society_members', auth('list_society_members'), societyMember.list);
router.post('/v1/society_members', auth('create_society_member'), societyMember.create);

// Society
router.get('/v1/societies', auth('list_societies'), society.list);
router.get('/v1/societies/:society_id', auth('retrieve_society'), society.retrieve);
router.get('/v1/society/report', auth('report_society'), society.report);

// System
router.get('/v1/system/report', auth('report_system'), system.report);

// User
router.get('/v1/users', auth('list_users'), userService.list);
router.post('/v1/user', auth('create_user'), userService.create);
router.put('/v1/user/:user_id', auth('update_user'), userService.update);
router.get('/v1/user/:user_id', auth('retrieve_user'), userService.retrieve);

export { router };
