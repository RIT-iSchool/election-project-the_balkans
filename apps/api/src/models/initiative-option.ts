/** InitiativeOption table type */
export type InitiativeOption = {
  id: number;
  /** ElectionInitiative ID referencing ElectionInitiative table */
  election_initiative_id: number;
  title: string;
};
