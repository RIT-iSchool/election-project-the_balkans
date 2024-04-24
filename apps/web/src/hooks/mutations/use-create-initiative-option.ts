import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type InitiativeOptionData = {
  societyId: number;
  electionInitiativeId: number;
  title: string;
};

const createInitiativeOption = async (
  initiativeOptionData: InitiativeOptionData,
  electionId: string,
) => {
  const response = await axios.post(
    `/api/v1/elections/${electionId}/initiative_options`,
    initiativeOptionData,
  );

  return response.data as InitiativeOptionData;
};

export const useCreateInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createInitiativeOption,
    ...opts,
  });
