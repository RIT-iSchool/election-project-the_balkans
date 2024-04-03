import { Role } from '../db/schema';

enum Permissions {
  create_election = 'create_election',
  list_elections = 'list_elections',
}

type Permission = keyof typeof Permissions;

type Permissons = Record<Role, Permission[]>;

export const permissions: Permissons = {
  member: [],
  officer: [Permissions.create_election],
  employee: [Permissions.create_election],
};
