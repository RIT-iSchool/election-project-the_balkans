import useSWR from 'swr';

type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

export const useElectionCandidate = (candidate_id: string) => {
  const { data, error, isLoading } = useSWR<ElectionCandidate>(
    `api/v1/elections/election_candidates/${candidate_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
