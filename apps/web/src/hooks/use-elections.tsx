import useSWR from 'swr';

type Election = {
  id: number;
  name: string;
  societyId: number;
  startDate: Date;
  endDate: Date;
  photoURL?: string;
};

export const useElection = (electionId: string) => {
  const { data, error, isLoading } = useSWR<Election[]>(
    `/api/v1/elections/${electionId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
