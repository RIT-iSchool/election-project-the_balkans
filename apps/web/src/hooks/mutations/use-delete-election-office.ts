import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

const deleteElectionOffice = async (electionOfficeId: number) => {
  const response = await axios.delete(
    `/api/v1/elections/election_offices/${electionOfficeId}`,
  );
  return response.data;
};

export const useDeleteElectionOffice = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionOffice,
    ...opts,
  });
