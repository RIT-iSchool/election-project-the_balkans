import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionCandidateData = Partial<{
  id: number;
  name: string;
  description: string;
  photoURL: string | null;
}> & {
  candidateId: string | number;
  electionId: string | number;
  officeId: string | number;
};

const updateElectionCandidate = async (
  electionCandidateData: ElectionCandidateData,
) => {
  const { electionId, candidateId, officeId } = electionCandidateData;

  const response = await axios.put(
    `/api/v1/elections/${electionId}/election_offices/${officeId}/election_candidates/${candidateId}`,
    electionCandidateData,
  );
  return response.data;
};

export const useUpdateElectionCandidate = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElectionCandidate,
    ...opts,
  });
