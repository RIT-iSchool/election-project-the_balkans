import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type InitiativeOptionData = {};

const updateInitiativeOption = async (
  optionId: number,
  initiativeOptionData: InitiativeOptionData,
) => {
  const response = await axios.put(
    `/api/v1/elections/initiative_options/${optionId}`,
    initiativeOptionData,
  );
  return response.data;
};

export const useUpdateInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateInitiativeOption,
    ...opts,
  });
