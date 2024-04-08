import useSWR from 'swr';

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  admin: boolean;
};

export const useUser = () => {
  const { data, error, isLoading } = useSWR<User>('/ajax/auth/session');

  return {
    data,
    error,
    isLoading,
  };
};
