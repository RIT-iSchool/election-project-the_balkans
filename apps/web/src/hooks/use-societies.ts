import useSWR from 'swr';
import { Paginated } from './types';

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
  page?: string;
};

export const useSocieties = ({ search, page }: UseSocietiesOptions) => {
  const { data, error, isLoading } = useSWR<Paginated<Society>>(
    `/api/v1/societies?search=${search}${page ? `&page=${page}` : ''}`,
  );

  return {
    ...data,
    error,
    isLoading,
  };
};
