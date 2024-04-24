import useSWR from 'swr';

type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

type UseElectionOfficeOptions = {
  officeId: string;
};

export const useElectionOffices = ({ officeId }: UseElectionOfficeOptions) => {
  const { data, error, isLoading } = useSWR<ElectionOffice>(
    `/api/v1/elections/election_offices/${officeId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
