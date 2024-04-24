import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type CreateElectionInitiativeData = {
  electionId: number;
  societyId: number;
  description: string;
  initiativeName: string;
};

const createElectionInitiative = async (
  createElectionInitiativeData: CreateElectionInitiativeData,
  electionId: string,
) => {
  const response = await axios.post(
    `/api/v1/elections/${electionId}/election_initiatives`,
    createElectionInitiativeData,
  );

  return response.data as CreateElectionInitiativeData;
};

export const useCreateElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElectionInitiative,
    ...opts,
  });
