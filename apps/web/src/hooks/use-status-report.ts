import useSWR from 'swr';

export type StatusReport = {
  totalVotes: number;
  votingMembers: {
    votingUser: {
      firstName: string;
      lastName: string;
    };
  }[];
  nonVotingMembers: {
    nonVotingUser: {
      firstName: string;
      lastName: string;
    };
  }[];
  votingMemberPercentage: number | null;
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
