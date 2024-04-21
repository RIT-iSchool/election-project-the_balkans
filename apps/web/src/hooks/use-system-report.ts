import useSWR from 'swr';

type SystemReport = {
  loggedInUsers: number;
  activeElections: number;
  averageQueryTime: number;
  averageHttpResponseTime: number;
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
