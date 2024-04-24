import useSWR from 'swr';

type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

type UseElectionCandidateOptions = {
  candidateId: string;
};

export const useElectionCandidate = ({
  candidateId,
}: UseElectionCandidateOptions) => {
  const { data, error, isLoading } = useSWR<ElectionCandidate>(
    `api/v1/elections/election_candidates/${candidateId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
