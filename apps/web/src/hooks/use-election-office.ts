import useSWR from 'swr';

export type ElectionOffice = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

type UseElectionOfficeOptions = {
  electionId: string;
  officeId: number | string;
};

export const useElectionOffice = ({
  electionId,
  officeId,
}: UseElectionOfficeOptions) => {
  const { data, error, isLoading } = useSWR<ElectionOffice>(
    `/api/v1/elections/${electionId}/election_offices/${officeId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
