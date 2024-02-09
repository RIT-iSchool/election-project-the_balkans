/** ElectionInitiative table type */
export type ElectionInitiative = {
  id: number;
  /** Election ID referencing Election table */
  election_id: number;
  initiative_name: string;
  description: string;
};
