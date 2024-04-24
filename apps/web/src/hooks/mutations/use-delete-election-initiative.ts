import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

const deleteElectionInitiative = async (electionInitiativeId: number) => {
  const response = await axios.delete(
    `/api/v1/elections/election_initiatives/${electionInitiativeId}`,
  );
  return response.data;
};

export const useDeleteElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionInitiative,
    ...opts,
  });
