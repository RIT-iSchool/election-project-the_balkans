/** ElectionOffice table type */
export type ElectionOffice = {
  id: number;
  /** Election ID referencing Election table */
  election_id: number;
  office_name: string;
  max_votes: number;
};
