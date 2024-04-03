import useSWR from 'swr';

type Election = {
  id: number;
  name: string;
  societyId: number;
  startDate: Date;
  endDate: Date;
  photoURL?: string;
};

export const useElections = () => {
  const { data, error, isLoading } = useSWR<Election[]>('/api/v1/elections');

  return {
    data,
    error,
    isLoading,
  };
};
