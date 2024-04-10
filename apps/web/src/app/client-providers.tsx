'use client';
import { useUser } from '@/hooks/use-user';
import { PropsWithChildren, useEffect } from 'react';
import { SWRConfig } from 'swr';

const fetcher = async (...args: any) => {
  const societyId = localStorage.getItem('society_id');

  const response = await fetch(args, {
    ...(societyId && {
      headers: {
        'x-society-id': societyId,
      },
    }),
  });

  return await response.json();
};

const ClientProviders = ({ children }: PropsWithChildren) => {
  const { data: user, isLoading } = useUser();

  // Set the society ID on first page load
  useEffect(() => {
    if (isLoading || !user) return;
    if (!user.societies.length) return;
    if (localStorage.getItem('society_id')) return;

    localStorage.setItem('society_id', user.societies[0].society.id.toString());
  }, [user]);

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export { ClientProviders };
