import { permissions, Permissions } from '../../src/constants/permissions';

describe('test member permissions', () => {
  const memberPermissions = [
    Permissions.list_elections,
    Permissions.submit_ballot,
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
