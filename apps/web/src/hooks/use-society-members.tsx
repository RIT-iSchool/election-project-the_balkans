import useSWR from 'swr';

type societyMember = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

export const useSocietyMembers = (society_id: string) => {
  const { data, error, isLoading } = useSWR<societyMember[]>(
    `/api/v1/society_members/${society_id}`,
    );

  return {
    data,
    error,
    isLoading,
  };
};
