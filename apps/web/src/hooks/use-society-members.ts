import useSWR from 'swr';

type SocietyMember = {
  id: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

export const useSocietyMembers = (society_id: string) => {
  const { data, error, isLoading } = useSWR<SocietyMember[]>(
    `/api/v1/society_members/${society_id}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
