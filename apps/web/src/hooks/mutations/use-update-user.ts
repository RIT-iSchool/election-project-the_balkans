import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type UserData = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  admin: boolean;
};

const updateUser = async (userId: number, userData: UserData) => {
  const response = await axios.put(`/api/v1/user/${userId}`, userData);
  return response.data;
};

export const useUpdateUser = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: updateUser,
    ...opts,
  });
