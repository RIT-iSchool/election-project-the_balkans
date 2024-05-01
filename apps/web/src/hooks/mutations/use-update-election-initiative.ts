import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionInitiativeData = {
  initiativeId: number;
  description: string;
  electionId: number;
  initiativeName: string;
};

const updateElectionInitiative = async (options: ElectionInitiativeData) => {
  const response = await axios.put(
    `/api/v1/elections/${options.electionId}/election_initiatives/${options.initiativeId}`,
    options,
  );

  return response.data;
};

export const useUpdateElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionInitiative,
    ...opts,
  });
