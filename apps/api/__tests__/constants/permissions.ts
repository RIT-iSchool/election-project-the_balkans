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
    Permissions.update_election,
    Permissions.create_election,
    Permissions.create_office,
    Permissions.list_offices,
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.submit_ballot,
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
    Permissions.list_elections,
    Permissions.retrieve_election,
    Permissions.update_election,
    Permissions.create_election,
    Permissions.create_office,
    Permissions.list_offices,
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.create_society_member,
    Permissions.list_society_members,
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
    Permissions.list_elections,
    Permissions.retrieve_election,
    Permissions.update_election,
    Permissions.create_election,
    Permissions.create_office,
    Permissions.list_offices,
    Permissions.create_candidate,
    Permissions.list_candidates,
    Permissions.create_initiative,
    Permissions.list_initiatives,
    Permissions.create_society_member,
    Permissions.list_society_members,
    Permissions.list_societies,
    Permissions.retrieve_society,
    Permissions.report_society,
    Permissions.report_system,
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
