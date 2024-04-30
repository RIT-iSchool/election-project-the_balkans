import axios from 'axios';
import { ProxiedUseMutationOptions, useMutation } from './use-mutation';

type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  id: number;
};

type CreateUserData = Omit<UserData, 'id'>;

const createUser = async (userData: CreateUserData) => {
  const response = await axios.post('/api/v1/user', userData);

  return response.data as UserData;
};

export const useCreateUser = (opts: ProxiedUseMutationOptions) =>
  useMutation({
    mutationFn: createUser,
    ...opts,
  });
