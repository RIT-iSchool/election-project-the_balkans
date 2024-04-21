import useSWR from 'swr';

type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

export const useElectionOffices = (office_id: string) => {
  const { data, error, isLoading } = useSWR<ElectionOffice>(
    `/api/v1/elections/election_offices/${office_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
