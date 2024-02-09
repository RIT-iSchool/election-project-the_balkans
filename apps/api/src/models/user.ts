/** User table type */
export type User = {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  admin: boolean;
};
