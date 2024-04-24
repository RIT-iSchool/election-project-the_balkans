import useSWR from 'swr';

type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

type UseInitiativeOptionOptions = {
  electionId: string;
};

export const useInitiativeOptions = ({
  electionId,
}: UseInitiativeOptionOptions) => {
  const { data, error, isLoading } = useSWR<InitiativeOption[]>(
    `/api/v1/elections/${electionId}/initiative_options`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
