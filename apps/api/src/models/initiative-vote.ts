/** InitiativeVote table type */
export type InitiativeVote = {
  id: number;
  /** SocietyMember ID referencing SocietyMember table */
  member_id: number;
  /** ElectionInitiative ID referencing ElectionInitiative table */
  election_initiative_id: number;
  /** InitiativeOption ID referencing InitiativeOption table */
  election_initiative_option_id: number;
};
