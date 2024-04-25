import useSWR from 'swr';

export type Election = {
  id: number;
  name: string;
  societyId: number;
  startDate: Date;
  endDate: Date;
  photoUrl?: string;
};

export const useElections = () => {
  const { data, error, isLoading } = useSWR<Election[]>(`/api/v1/elections`);

  return {
    data,
    error,
    isLoading,
  };
};
