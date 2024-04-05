import useSWR from 'swr';

type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

export const useElectionsCandidates = (electionId: string) => {
  const { data, error, isLoading } = useSWR<ElectionCandidate[]>(
    '/v1/elections/${election_id}/election_candidates',
  );

  return {
    data,
    error,
    isLoading,
  };
};
