import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type ElectionData = {
  id: number;
  name: string;
  societyId: number;
  startDate: string;
  endDate: string;
  photoUrl: string | null;
};

const updateElection = async (
  electionId: number,
  electionData: ElectionData,
) => {
  const response = await axios.put(
    `/api/v1/elections/${electionId}`,
    electionData,
  );
  return response.data;
};

export const useUpdateElection = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateElection,
    ...opts,
  });
