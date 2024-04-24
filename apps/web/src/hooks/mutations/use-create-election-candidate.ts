import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type electionCandidateData = {
  name: string;
  societyId: number;
  description: string;
  electionOfficeId: number;
  photoURL?: string | null | undefined;
};

const createElectionCandidate = async (
  electionCandidateData: electionCandidateData,
  electionId: string,
) => {
  const response = await axios.post(
    `/api/v1/elections/${electionId}/election_candidates`,
    electionCandidateData,
  );

  return response.data as electionCandidateData;
};

export const useCreateElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createElectionCandidate,
    ...opts,
  });
