import useSWR from 'swr';

type Ballot = Election & {
  offices: (ElectionOffice & { candidates: ElectionCandidate[] })[];
  initiatives: (ElectionInitiative & { options: InitiativeOption[] })[];
};

type Election = {
  id: number;
  name: string;
  societyId: number;
  startDate: Date;
  endDate: Date;
  photoURL?: string;
};

type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

type ElectionInitiative = {
  id: number;
  electionId: number;
  initiativeName: string;
  description: string;
};

type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

export const useBallot = (electionId: string) => {
  const { data, error, isLoading } = useSWR<Ballot>(
    `/api/v1/elections/${electionId}/ballot`,
  );
  return { data, error, isLoading };
};