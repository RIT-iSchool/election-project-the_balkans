import useSWR from 'swr';
import { ballot } from '@/types/ballot';

export const useElectionOffices = (electionId: string) => {
  const { data, error, isLoading } = useSWR<ballot>(
    `/api/v1/elections/${electionId}/election_ballot`,
    );

  return {
    data,
    error,
    isLoading,
  };
};