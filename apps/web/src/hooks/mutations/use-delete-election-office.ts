import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type DeleteElectionOfficeOptions = {
  electionId: number;
  officeId: number;
};

const deleteElectionOffice = async ({
  electionId,
  officeId,
}: DeleteElectionOfficeOptions) => {
  const response = await axios.delete(
    `/api/v1/elections/${electionId}/election_offices/${officeId}`,
  );

  return response.data;
};

export const useDeleteElectionOffice = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionOffice,
    ...opts,
  });
