/** CandidateVote table type */
export type CandidateVote = {
  id: number;
  /** SocietyMember ID referencing SocietyMember table */
  member_id: number;
  /** ElectionCandidate ID referencing ElectionCandidate table */
  election_candidate_id: number;
};
