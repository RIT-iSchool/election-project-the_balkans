import useSWR from 'swr';

type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

export const useElectionOffices = (electionId: string) => {
  const { data, error, isLoading } = useSWR<ElectionOffice[]>(
    `/api/v1/elections/${electionId}/election_offices`,
    );

  return {
    data,
    error,
    isLoading,
  };
};
