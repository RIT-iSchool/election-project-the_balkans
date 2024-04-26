import useSWR from 'swr';

export type StatusReport = {
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

type UseStatusReportOptions = {
  electionId: string;
};

export const useStatusReport = ({ electionId }: UseStatusReportOptions) => {
  const { data, error, isLoading } = useSWR<StatusReport>(
    `/api/v1/report/status/${electionId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
