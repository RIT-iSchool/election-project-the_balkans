import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionData = {
  name: string;
  startDate: string;
  endDate: string;
  photoUrl: string;
};

const createElection = async (electionData: ElectionData) => {
  const response = await axios.post('/api/v1/elections', electionData);

  return response.data as ElectionData;
};

export const useCreateElection = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElection,
    ...opts,
  });
