/** ElectionCandidate table type */
export type ElectionCandidate = {
  id: number;
  /** ElectionOffice ID referencing ElectionOffice table */
  election_office_id: number;
  name: string;
  photo_url: string;
  description: string;
};
