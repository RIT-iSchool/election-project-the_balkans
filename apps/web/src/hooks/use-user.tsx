import useSWR from 'swr';
import { User } from '../models/user';

export const useUser = () => { 
  const { data, error, isLoading} = useSWR<User>('/ajax/auth/session');

  return {
    data,
    error,
    isLoading,
  };
}