import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionCandidateData = {
  id: number;
  name: string;
  societyId: number;
  description: string;
  electionOfficeId: number;
  photoURL: string | null;
};

const updateElectionCandidate = async (
  candidateId: number,
  electionCandidateData: ElectionCandidateData,
) => {
  const response = await axios.put(
    `/api/v1/elections/election_candidates/${candidateId}`,
    electionCandidateData,
  );
  return response.data;
};

export const useUpdateElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionCandidate,
    ...opts,
  });
