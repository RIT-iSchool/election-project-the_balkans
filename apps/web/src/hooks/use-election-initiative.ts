import useSWR from 'swr';

type ElectionInitiative = {
  id: number;
  electionId: number;
  initiativeName: string;
  description: string;
};

type UseElectionInitiativeOptions = {
  initiativeId: string;
};

export const useElectionInitiative = ({
  initiativeId,
}: UseElectionInitiativeOptions) => {
  const { data, error, isLoading } = useSWR<ElectionInitiative>(
    `/api/v1/elections/election_initiatives/${initiativeId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
