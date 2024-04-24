import useSWR from 'swr';

type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

type UseElectionCandidatesOptions = {
  electionId: string;
};

export const useElectionCandidates = ({
  electionId,
}: UseElectionCandidatesOptions) => {
  const { data, error, isLoading } = useSWR<ElectionCandidate[]>(
    `/api/v1/elections/${electionId}/election_candidates`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
