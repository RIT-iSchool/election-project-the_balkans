import useSWR from 'swr';

export type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

type UseInitiativeOptionOptions = {
  electionId: string | number;
  initiativeId: string | number;
};

export const useInitiativeOptions = ({
  electionId,
  initiativeId,
}: UseInitiativeOptionOptions) => {
  const { data, error, isLoading, mutate } = useSWR<InitiativeOption[]>(
    `/api/v1/elections/${electionId}/election_initiatives/${initiativeId}/initiative_options`,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
