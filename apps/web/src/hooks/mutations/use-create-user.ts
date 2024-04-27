import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id?: number | undefined;
};

const createUser = async (userData: UserData) => {
  const response = await axios.post('/api/v1/user', userData);

  return response.data as UserData;
};

export const useCreateUser = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createUser,
    ...opts,
  });
