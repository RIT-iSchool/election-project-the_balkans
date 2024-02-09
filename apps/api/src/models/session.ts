/** Session table type */
export type Session = {
  id: string;
  /** User ID referencing User table */
  user_id: number;
  token: string;
  expires_at: Date;
};
