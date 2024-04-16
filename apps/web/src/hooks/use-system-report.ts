import useSWR from 'swr';

type SystemReport = {
  loggedInUsers: number;
  activeElections: number;
  averageQueryTime: number;
  averageHttpResponseTime: number;
};

export const useSysetmReport = () => {
  const { data, error, isLoading } = useSWR<SystemReport>(
    `/api/v1/system/report`,
  );
  return {
    data,
    error,
    isLoading,
  };
};
