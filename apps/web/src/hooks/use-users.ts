import useSWR from 'swr';

type User = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  admin: boolean;
};

export const useUsers = () => {
  const { data, error, isLoading } = useSWR<User[]>(`/api/v1/users`);

  return {
    data,
    error,
    isLoading,
  };
};
