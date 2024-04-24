import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type SocietyMemberData = {
  societyId: number;
  userId: number;
  role: 'member' | 'officer' | 'employee';
};

const createSocietyMember = async (societyMemberData: SocietyMemberData) => {
  const response = await axios.post(
    `/api/v1/society_members`,
    societyMemberData,
  );

  return response.data as SocietyMemberData;
};

export const useCreateSocietyMember = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createSocietyMember,
    ...opts,
  });
