/** SocietyMember table type */
export type SocietyMember = {
  id: number;
  /** User ID referencing User table */
  user_id: number;
  /** Society ID referencing Society table */
  society_id: number;
  role: 'MEMBER' | 'OFFICER' | 'EMPLOYEE';
};
