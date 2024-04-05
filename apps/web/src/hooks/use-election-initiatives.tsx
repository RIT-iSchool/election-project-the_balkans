import useSWR from 'swr';

type electionInitiative = {
    id: number;
    electionId: number;
    initiativeName: string;
    description: string;
  };
  
  export const useSocietyMembers = (electionId: string) => {
    const { data, error, isLoading } = useSWR<electionInitiative[]>(
      `/api/v1/elections/${electionId}/election_initiatives`,
      );
  
    return {
      data,
      error,
      isLoading,
    };
  };