import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionInitiativeData = {
  id: number;
  societyId: number;
  description: string;
  electionId: number;
  initiativeName: string;
};

const updateElectionInitiative = async (
  initiativeId: number,
  electionInitiativeData: ElectionInitiativeData,
) => {
  const response = await axios.put(
    `/api/v1/elections/election_initiatives/${initiativeId}`,
    electionInitiativeData,
  );
  return response.data;
};

export const useUpdateElectionInitiative = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionInitiative,
    ...opts,
  });
