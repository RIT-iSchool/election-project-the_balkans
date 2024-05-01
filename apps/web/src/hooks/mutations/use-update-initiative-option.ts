import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type InitiativeOptionData = {
  electionId: number;
  optionId: number;
  initiativeId: number;
  title: string;
};

const updateInitiativeOption = async (options: InitiativeOptionData) => {
  const response = await axios.put(
    `/api/v1/elections/${options.electionId}/election_initiatives/${options.initiativeId}/initiative_options/${options.optionId}`,
    options,
  );

  return response.data;
};

export const useUpdateInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateInitiativeOption,
    ...opts,
  });
