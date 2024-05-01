import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type DeleteElectionCandidateOptions = {
  electionId: number;
  officeId: number;
  candidateId: number;
};

const deleteElectionCandidate = async ({
  electionId,
  officeId,
  candidateId,
}: DeleteElectionCandidateOptions) => {
  const response = await axios.delete(
    `/api/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
  );

  return response.data;
};

export const useDeleteElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: deleteElectionCandidate,
    ...opts,
  });
