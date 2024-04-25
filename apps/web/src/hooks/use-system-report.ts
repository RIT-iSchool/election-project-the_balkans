import useSWR from 'swr';

export type SystemReport = {
  loggedInUsers: number;
  activeElections: number;
  averageRequestTime: number;
  averageResponseTime: number;
};

export const useSystemReport = () => {
  const { data, error, isLoading } = useSWR<SystemReport>(
    `/api/v1/report/system`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
