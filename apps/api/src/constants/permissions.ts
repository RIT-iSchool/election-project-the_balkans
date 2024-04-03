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

export type Permission = keyof typeof Permissions;

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
  ] as string[],
};
