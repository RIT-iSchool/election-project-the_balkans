import useSWR from 'swr';
import { Paginated } from './types';

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

type UseUsersOptions = {
  page?: string;
};

export const useUsers = ({ page }: UseUsersOptions) => {
  const { data, error, isLoading } = useSWR<Paginated<User>>(
    `/api/v1/users${page ? `?page=${page}` : ''}`,
  );

  return {
    ...data,
    error,
    isLoading,
  };
};
