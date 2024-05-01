import useSWR from 'swr';

export type ElectionInitiative = {
  id: number;
  electionId: number;
  initiativeName: string;
  description: string;
};

type UseElectionInitiativeOptions = {
  electionId: string | number;
  initiativeId: string | number;
};

export const useElectionInitiative = ({
  electionId,
  initiativeId,
}: UseElectionInitiativeOptions) => {
  const { data, error, isLoading } = useSWR<ElectionInitiative>(
    `/api/v1/elections/${electionId}/election_initiatives/${initiativeId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
