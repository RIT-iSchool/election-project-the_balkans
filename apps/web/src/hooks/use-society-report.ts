import useSWR from 'swr';

type SocietyReport = {
  activeBallots: number;
  inActiveBallots: number;
  societyUsers: number;
  averageVotingMembers: number;
};

export const useSocietyReport = (society_id: string) => {
  const { data, error, isLoading } = useSWR<SocietyReport>(
    `/api/v1/societies/${society_id}/report`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
