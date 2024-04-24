'use client';
import { useSession } from '@/hooks/use-session';
import { PropsWithChildren, useEffect } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';

const fetcher = async (...args: any) => {
  const response = await axios.get(args, {
    headers: {
      'x-society-id': localStorage.getItem('society_id'),
    },
  });

  return response.data;
};

const ClientProviders = ({ children }: PropsWithChildren) => {
  const { data: user, isLoading } = useSession();

  // Set the society ID on first page load
  useEffect(() => {
    if (isLoading || !user) return;
    if (!user.societies.length) return;

    const societyId =
      localStorage.getItem('society_id') ||
      user.societies[0].society.id.toString();

    axios.defaults.headers.common['x-society-id'] = societyId;
    localStorage.setItem('society_id', societyId);
  }, [user, isLoading]);

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export { ClientProviders };
