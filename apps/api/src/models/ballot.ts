/**
 * Ballot type that includes Election, ElectionOffice, ElectionCandidate, ElectionInitiative, and InitiativeOption.
 */

import {
  Election,
  ElectionCandidate,
  ElectionInitiative,
  ElectionOffice,
  InitiativeOption,
} from '../db/schema';

type Ballot = Election & {
  offices: (ElectionOffice & { candidates: ElectionCandidate[] })[];
  initiatives: (ElectionInitiative & { options: InitiativeOption[] })[];
};
