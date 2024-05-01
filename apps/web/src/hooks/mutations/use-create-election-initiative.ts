import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type CreateElectionInitiativeData = {
  electionId: number;
  description: string;
  initiativeName: string;
};

const createElectionInitiative = async (
  createElectionInitiativeData: CreateElectionInitiativeData,
) => {
  const response = await axios.post(
    `/api/v1/elections/${createElectionInitiativeData.electionId}/election_initiatives`,
    createElectionInitiativeData,
  );

  return response.data as CreateElectionInitiativeData;
};

export const useCreateElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElectionInitiative,
    ...opts,
  });
