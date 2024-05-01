import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type DeleteInitiativeOptionOptions = {
  electionId: number;
  initiativeId: number;
  optionId: number;
};

const deleteInitiativeOption = async (
  options: DeleteInitiativeOptionOptions,
) => {
  const response = await axios.delete(
    `/api/v1/elections/${options.electionId}/election_initiatives/${options.initiativeId}/initiative_options/${options.optionId}`,
  );

  return response.data;
};

export const useDeleteInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteInitiativeOption,
    ...opts,
  });
