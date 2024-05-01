import useSWR from 'swr';
import { Paginated } from './types';

export type SocietyMember = {
  id: number;
  userId: number;
  societyId: number;
  role: 'member' | 'officer' | 'employee';
  user: {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    admin: boolean;
  } | null;
};

type UseSocietyMembersOptions = {
  page?: string;
};

export const useSocietyMembers = ({ page }: UseSocietyMembersOptions) => {
  const { data, error, isLoading, mutate } = useSWR<Paginated<SocietyMember>>(
    `/api/v1/society_members${page ? `?page=${page}` : ''}`,
  );

  return {
    ...data,
    error,
    isLoading,
    mutate,
  };
};
