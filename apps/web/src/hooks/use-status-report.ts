import useSWR from 'swr';

type StatusReport = {
  startDate: {
    startDate: string;
  };
  endDate: {
    endData: string;
  };
  totalVotes: number;
  votingMembers: {
    firstName: string;
    lastName: string;
  }[];
  nonVotingMembers: {
    firstName: string;
    lastName: string;
  }[];
  votingMemberPercentage: number;
};

export const useStatusReport = (election_id: string) => {
  const { data, error, isLoading } = useSWR<StatusReport>(
    `/api/v1/report/status/${election_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
