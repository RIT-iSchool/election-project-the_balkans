import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionOfficeData = {
  officeId: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

const updateElectionOffice = async (options: ElectionOfficeData) => {
  const response = await axios.put(
    `/api/v1/elections/${options.electionId}/election_offices/${options.officeId}`,
    options,
  );

  return response.data;
};

export const useUpdateElectionOffice = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionOffice,
    ...opts,
  });
