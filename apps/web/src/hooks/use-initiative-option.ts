import useSWR from 'swr';

export type InitiativeOption = {
  id: number;
  electionInitiativeId: number;
  title: string;
};

type UseInitiativeOptionOptions = {
  optionId: number;
  electionId: number;
  initiativeId: number;
};

export const useInitiativeOption = ({
  optionId,
  electionId,
  initiativeId,
}: UseInitiativeOptionOptions) => {
  const { data, error, isLoading } = useSWR<InitiativeOption>(
    `/api/v1/elections/${electionId}/election_initiatives/${initiativeId}/initiative_options/${optionId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
