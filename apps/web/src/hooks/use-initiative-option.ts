import useSWR from 'swr';

type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

export const useInitiativeOption = (option_id: string) => {
  const { data, error, isLoading } = useSWR<InitiativeOption>(
    `/api/v1/elections/initiative_options/${option_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
