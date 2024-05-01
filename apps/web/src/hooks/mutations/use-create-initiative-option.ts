import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type InitiativeOptionData = {
  initiativeId: string;
  electionId: string;
  title: string;
};

const createInitiativeOption = async (options: InitiativeOptionData) => {
  const response = await axios.post(
    `/api/v1/elections/${options.electionId}/election_initiatives/${options.initiativeId}/initiative_options`,
    options,
  );

  return response.data as InitiativeOptionData;
};

export const useCreateInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createInitiativeOption,
    ...opts,
  });
