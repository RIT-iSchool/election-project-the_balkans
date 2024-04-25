import useSWR from 'swr';

export type SocietyReport = {
  activeBallots: number;
  inActiveBallots: number;
  societyUsers: number;
  averageVotingMembers: number;
};

export const useSocietyReport = () => {
  const { data, error, isLoading } = useSWR<SocietyReport>(
    `/api/v1/report/society`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
