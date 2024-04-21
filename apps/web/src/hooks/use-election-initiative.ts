import useSWR from 'swr';

type ElectionInitiative = {
  id: number;
  electionId: number;
  initiativeName: string;
  description: string;
};

export const useElectionInitiative = (initiative_id: string) => {
  const { data, error, isLoading } = useSWR<ElectionInitiative>(
    `/api/v1/elections/election_initiatives/${initiative_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
