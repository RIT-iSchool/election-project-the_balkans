import { election } from './election';
import { electionCandidate } from './electionCandidate';
import { electionInitiative } from './electionInitiative';
import { electionOffice } from './electionOffice';
import { initiativeOption } from './initiativeOption';

export type ballot = election & {
  offices: (electionOffice & { candidates: electionCandidate[] })[];
  initiatives: (electionInitiative & { options: initiativeOption[] })[];
};
