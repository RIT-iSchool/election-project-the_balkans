import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

export type MemberData = {
  role: 'member' | 'officer' | 'employee';
};

const updateSocietyMember = async (
  memberId: number,
  memberData: MemberData,
) => {
  const response = await axios.put(
    `/api/v1/society_members/${memberId}`,
    memberData,
  );
  return response.data;
};

export const useUpdateSocietyMember = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateSocietyMember,
    ...opts,
  });
