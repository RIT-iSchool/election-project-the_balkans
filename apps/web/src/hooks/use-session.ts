import useSWR from 'swr';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  societies: {
    id: number;
    name: string;
  }[];
  society: {
    id: number;
    name: string;
  };
  role: 'admin' | 'member' | 'officer' | 'employee';
};

export const useSession = () => {
  const { data, error, isLoading } = useSWR<User>('/ajax/auth/session');

  return {
    data,
    error,
    isLoading,
  };
};
