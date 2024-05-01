import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

const submitBallot = async (ballotData: any) => {
  const response = await axios.post(
    `/api/v1/elections/${ballotData.electionId}/ballot`,
    ballotData,
  );

  return response.data;
};

export const useSubmitBallot = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: submitBallot,
    ...opts,
  });
