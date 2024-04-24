import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

const deleteElectionCandidate = async (electionCandidateId: number) => {
  const response = await axios.delete(
    `/api/v1/elections/election_candidates/${electionCandidateId}`,
  );
  return response.data;
};

export const useDeleteElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionCandidate,
    ...opts,
  });
