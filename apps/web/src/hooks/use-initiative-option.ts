import useSWR from 'swr';

type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

type UseInitiativeOptionOptions = {
  optionId: string;
};

export const useInitiativeOption = ({
  optionId,
}: UseInitiativeOptionOptions) => {
  const { data, error, isLoading } = useSWR<InitiativeOption>(
    `/api/v1/elections/initiative_options/${optionId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
