import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionOfficeData = {
  id: number;
  societyId: number;
  electionId: number;
  officeName: string;
  maxVotes: number;
};

const updateElectionOffice = async (
  officeId: number,
  electionOfficeData: ElectionOfficeData,
) => {
  const response = await axios.put(
    `/api/v1/elections/election_offices/${officeId}`,
    electionOfficeData,
  );
  return response.data;
};

export const useUpdateElectionOffice = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionOffice,
    ...opts,
  });
