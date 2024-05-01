import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type DeleteElectionInitiativeOptions = {
  initiativeId: number;
  electionId: number;
};

const deleteElectionInitiative = async (
  options: DeleteElectionInitiativeOptions,
) => {
  const response = await axios.delete(
    `/api/v1/elections/${options.electionId}/election_initiatives/${options.initiativeId}`,
  );

  return response.data;
};

export const useDeleteElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionInitiative,
    ...opts,
  });
