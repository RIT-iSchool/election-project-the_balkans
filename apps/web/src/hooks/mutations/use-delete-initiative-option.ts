import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';


const deleteInitiativeOption = async (initiativeOptionId: number) => {
  const response = await axios.delete(
    `/api/v1/elections/initiative_options/${initiativeOptionId}`,
  );
  return response.data;
};

export const useDeleteInitiativeOption = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteInitiativeOption,
    ...opts,
  });