import useSWR from 'swr';

type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

type UseElectionOfficeOptions = {
  electionId: string;
};

export const useElectionOffices = ({
  electionId,
}: UseElectionOfficeOptions) => {
  const { data, error, isLoading } = useSWR<ElectionOffice[]>(
    `/api/v1/elections/${electionId}/election_offices`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
