import useSWR from 'swr';

export type ElectionCandidate = {
  id: number;
  electionOfficeId: number;
  name: string;
  photoURL?: string;
  description: string;
};

type UseElectionCandidateOptions = {
  electionId: string | number;
  officeId: string | number;
  candidateId: string | number;
};

export const useElectionCandidate = ({
  electionId,
  officeId,
  candidateId,
}: UseElectionCandidateOptions) => {
  const { data, error, isLoading, mutate } = useSWR<ElectionCandidate>(
    `/api/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
