// This enum serves as the source of truth for the names and accessor names of all
// permissions for the application. The key and value should always match.
export enum Permissions {
  // Elections
  create_election = 'create_election',
  list_elections = 'list_elections',
  retrieve_election = 'retrieve_election',
  update_election = 'update_election',

  // Offices
  list_offices = 'list_offices',
  create_office = 'create_office',
  retrieve_office = 'retrieve_office',
  update_office = 'update_office',
  remove_office = 'remove_office',

  // Candidates
  list_candidates = 'list_candidates',
  create_candidate = 'create_candidate',
  retrieve_candidate = 'retrieve_candidate',
  update_candidate = 'update_candidate',
  remove_candidate = 'remove_candidate',

  // Election initiatives
  list_initiatives = 'list_initiatives',
  create_initiative = 'create_initiative',
  retrieve_initiative = 'retrieve_initiative',
  update_initiative = 'update_initiative',
  remove_initiative = 'remove_initiative',

  // Initiative options
  list_initiative_options = 'list_initiative_options',
  create_initiative_option = 'create_initiative_option',
  retrieve_initiative_option = 'retrieve_initiative_option',
  update_initiative_option = 'update_initiative_option',
  remove_initiative_option = 'remove_initiative_option',

  // Society members
  list_society_members = 'list_society_members',
  create_society_member = 'create_society_member',
  update_society_member = 'update_society_member',

  // Ballots
  submit_ballot = 'submit_ballot',
  retrieve_ballot = 'retrieve_ballot',

  // Society
  list_societies = 'list_societies',
  retrieve_society = 'retrieve_society',

  // Report
  report_society = 'report_society',
  report_system = 'report_system',
  report_status = 'report_status',
  report_results = 'report_results',

  // User
  create_user = 'create_user',
  list_users = 'list_users',
  retrieve_user = 'retrieve_user',
  update_user = 'update_user',
}

// This type is used to ensure that only valid permission strings
// are passed to the auth middleware
export type Permission = keyof typeof Permissions;

// This hash is used to determine which roles have which permissions. Each role
// has an array of permissions that are assigned to that role. They are down-casted to
// string arrays to make typescript happy elsewhere in the codebase. If you change this hash,
// you must adjust the tests to accomodate these changes, otherwise the tests will fail!
export const permissions = {
  member: [
    Permissions.list_elections,
    Permissions.submit_ballot,
    Permissions.retrieve_ballot,
  ] as string[],
  officer: [
    // Elections
    Permissions.list_elections,
    Permissions.retrieve_election,

    // Offices
    Permissions.list_offices,
    Permissions.retrieve_office,
    // Candidates
    Permissions.list_candidates,
    Permissions.retrieve_candidate,

    // Initiatives
    Permissions.list_initiatives,
    Permissions.retrieve_initiative,

    //InitiativeOptions
    Permissions.list_initiative_options,
    Permissions.retrieve_initiative_option,

    // Ballots
    Permissions.submit_ballot,
    Permissions.retrieve_ballot,

    // Society Members
    Permissions.list_society_members,

    //Report
    Permissions.report_status,
    Permissions.report_results,
  ] as string[],
  employee: [
    // Elections
    Permissions.create_election,
    Permissions.list_elections,
    Permissions.retrieve_election,
    Permissions.update_election,

    // Offices
    Permissions.create_office,
    Permissions.list_offices,
    Permissions.retrieve_office,
    Permissions.update_election,
    Permissions.remove_office,

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.retrieve_candidate,
    Permissions.update_candidate,
    Permissions.remove_candidate,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.retrieve_initiative,
    Permissions.update_initiative,
    Permissions.remove_initiative,

    // Initiative Options
    Permissions.list_initiative_options,
    Permissions.create_initiative_option,
    Permissions.retrieve_initiative_option,
    Permissions.update_initiative_option,
    Permissions.remove_initiative_option,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,

    //Ballot
    Permissions.retrieve_ballot,

    // Society
    Permissions.list_societies,
    Permissions.retrieve_society,

    //Report
    Permissions.report_status,
    Permissions.report_results,
  ] as string[],
  admin: [
    // Elections
    Permissions.create_election,
    Permissions.list_elections,
    Permissions.retrieve_election,
    Permissions.update_election,

    // Offices
    Permissions.create_office,
    Permissions.list_offices,
    Permissions.retrieve_office,
    Permissions.update_election,
    Permissions.remove_office,

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.retrieve_candidate,
    Permissions.update_candidate,
    Permissions.remove_candidate,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.retrieve_initiative,
    Permissions.update_initiative,
    Permissions.remove_initiative,

    // Initiative Options
    Permissions.list_initiative_options,
    Permissions.create_initiative_option,
    Permissions.retrieve_initiative_option,
    Permissions.update_initiative_option,
    Permissions.remove_initiative_option,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,
    Permissions.update_society_member,

    //Ballot
    Permissions.retrieve_ballot,

    // Society
    Permissions.list_societies,
    Permissions.retrieve_society,

    // Report
    Permissions.report_society,
    Permissions.report_system,
    Permissions.report_status,
    Permissions.report_results,

    // Users
    Permissions.create_user,
    Permissions.list_users,
    Permissions.retrieve_user,
    Permissions.update_user,
  ] as string[],
};
