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

  // Candidates
  list_candidates = 'list_candidates',
  create_candidate = 'create_candidate',

  // Election initiatives
  list_initiatives = 'list_election_initiatives',
  create_initiative = 'create_election_initiative',

  // Initiative options
  list_initiative_options = 'list_initiative_options',
  create_initiative_option = 'create_initiative_option',

  // Society members
  list_society_members = 'list_society_members',
  create_society_member = 'create_society_member',

  // Ballots
  submit_ballot = 'submit_ballot',
  retrieve_ballot = 'retrieve_ballot',
}

// This type is used to ensure that only valid permission strings
// are passed to the auth middleware
export type Permission = keyof typeof Permissions;

// This hash is used to determine which roles have which permissions. Each role
// has an array of permissions that are assigned to that role. They are down-casted to
// string arrays to make typescript happy elsewhere in the codebase. If you change this hash,
// you must adjust the tests to accomodate these changes, otherwise the tests will fail!
export const permissions = {
  member: [Permissions.list_elections, Permissions.submit_ballot] as string[],
  officer: [
    // Elections
    Permissions.create_election,
    Permissions.list_elections,
    Permissions.retrieve_election,
    Permissions.update_election,

    // Offices
    Permissions.create_office,
    Permissions.list_offices,

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,

    // Ballots
    Permissions.submit_ballot,

    // Society Members
    Permissions.list_society_members,
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

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,
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

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,
  ] as string[],
};
