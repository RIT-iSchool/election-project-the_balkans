import { permissions, Permissions } from '../../src/constants/permissions';

describe('test member permissions', () => {
  const memberPermissions = [
    Permissions.list_elections,
    Permissions.submit_ballot,
    Permissions.retrieve_ballot,
  ];

  test('a member has all the correct permissions', () => {
    memberPermissions.forEach((p) => {
      expect(permissions.member).toContain(p);
    });
  });

  test('a member does not have any more than the correct permissions', () => {
    permissions.member.forEach((p) => {
      expect(memberPermissions).toContain(p);
    });
  });
});

describe('test officer permissions', () => {
  const officerPermissions = [
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

    // Society Members
    Permissions.list_society_members,
  ];

  test('an officer has all the correct permissions', () => {
    officerPermissions.forEach((p) => {
      expect(permissions.officer).toContain(p);
    });
  });

  test('an officer does not have any more than the correct permissions', () => {
    permissions.officer.forEach((p) => {
      expect(officerPermissions).toContain(p);
    });
  });
});

describe('test employee permissions', () => {
  const employeePermissions = [
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

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.retrieve_candidate,
    Permissions.update_candidate,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.retrieve_initiative,
    Permissions.update_initiative,

    // Initiative Options
    Permissions.list_initiative_options,
    Permissions.create_initiative_option,
    Permissions.retrieve_initiative_option,
    Permissions.update_initiative_option,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,

    // Society
    Permissions.list_societies,
    Permissions.retrieve_society,
  ];

  test('an employee has all the correct permissions', () => {
    employeePermissions.forEach((p) => {
      expect(permissions.employee).toContain(p);
    });
  });

  test('an employee does not have any more than the correct permissions', () => {
    permissions.employee.forEach((p) => {
      expect(employeePermissions).toContain(p);
    });
  });
});

describe('test admin permissions', () => {
  const adminPermissions = [
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

    // Candidates
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.retrieve_candidate,
    Permissions.update_candidate,

    // Initiatives
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.retrieve_initiative,
    Permissions.update_initiative,

    // Initiative Options
    Permissions.list_initiative_options,
    Permissions.create_initiative_option,
    Permissions.retrieve_initiative_option,
    Permissions.update_initiative_option,

    // Society Members
    Permissions.create_society_member,
    Permissions.list_society_members,

    // Society
    Permissions.list_societies,
    Permissions.retrieve_society,

    // Report
    Permissions.report_society,
    Permissions.report_system,

    // Users
    Permissions.create_user,
    Permissions.list_users,
    Permissions.retrieve_user,
    Permissions.update_user,
  ];

  test('an admin has all the correct permissions', () => {
    adminPermissions.forEach((p) => {
      expect(permissions.admin).toContain(p);
    });
  });

  test('an admin does not have any more than the correct permissions', () => {
    permissions.admin.forEach((p) => {
      expect(adminPermissions).toContain(p);
    });
  });
});
