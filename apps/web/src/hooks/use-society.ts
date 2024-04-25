import useSWR from 'swr';

export type Society = {
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

type UseSocietyOptions = {
  societyId: string;
};

export const useSociety = ({ societyId }: UseSocietyOptions) => {
  const { data, error, isLoading } = useSWR<Society>(
    `/api/v1/societies/${societyId}`,
  );

  return {
    data,
    error,
    isLoading,
  };
};
