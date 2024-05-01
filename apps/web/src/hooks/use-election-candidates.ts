import useSWR from 'swr';

export type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

type UseElectionCandidatesOptions = {
  electionId: string | number;
  officeId: string | number;
};

export const useElectionCandidates = ({
  electionId,
  officeId,
}: UseElectionCandidatesOptions) => {
  const { data, error, isLoading, mutate } = useSWR<ElectionCandidate[]>(
    `/api/v1/elections/${electionId}/election_offices/${officeId}/election_candidates`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
