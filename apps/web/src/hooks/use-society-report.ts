import useSWR from 'swr';

type SocietyReport = {
  activeBallots: number;
  inActiveBallots: number;
  societyUsers: number;
  averageVotingMembers: number;
};

export const useSocietyReport = () => {
  const { data, error, isLoading } = useSWR<SocietyReport>(
    `/api/v1/society/report`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
