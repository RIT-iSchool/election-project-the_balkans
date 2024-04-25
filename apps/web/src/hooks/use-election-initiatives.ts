import useSWR from 'swr';

export type ElectionInitiative = {
  id: number;
  electionId: number;
  initiativeName: string;
  description: string;
};

type UseElectionInitiativesOptions = {
  electionId: string;
};

export const useElectionInitiatives = ({
  electionId,
}: UseElectionInitiativesOptions) => {
  const { data, error, isLoading } = useSWR<ElectionInitiative[]>(
    `/api/v1/elections/${electionId}/election_initiatives`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
