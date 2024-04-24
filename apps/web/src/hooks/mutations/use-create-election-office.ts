import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionOfficeData = {
  electionId: number;
  officeName: string;
  maxVotes: number;
  societyId: number;
};

const createElectionOffice = async (
  electionOfficeData: ElectionOfficeData,
  electionId: string,
) => {
  const response = await axios.post(
    `/api/v1/elections/${electionId}/election_offices`,
    electionOfficeData,
  );

  return response.data as ElectionOfficeData;
};

export const useCreateElectionOffice = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElectionOffice,
    ...opts,
  });
