import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type electionCandidateData = {
  name: string;
  description: string;
  officeId: string;
  photoURL?: string | null | undefined;
  electionId: string;
};

const createElectionCandidate = async (
  electionCandidateData: electionCandidateData,
) => {
  const response = await axios.post(
    `/api/v1/elections/${electionCandidateData.electionId}/election_offices/${electionCandidateData.officeId}/election_candidates`,
    electionCandidateData,
  );

  return response.data as electionCandidateData;
};

export const useCreateElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElectionCandidate,
    ...opts,
  });
