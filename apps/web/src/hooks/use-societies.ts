import useSWR from 'swr';

type Society = {
  id: number;
  name: string;
  ownerId: number;
  owner: {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    admin: boolean;
  };
};

type UseSocietiesOptions = {
  search?: string;
};

export const useSocieties = ({ search }: UseSocietiesOptions) => {
  const { data, error, isLoading } = useSWR<Society[]>(
    `/api/v1/societies?search=${search}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
