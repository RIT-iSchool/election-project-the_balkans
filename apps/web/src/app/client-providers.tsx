'use client';
import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

const fetcher = (...args: any) => fetch(args).then((response) => response.json());

const ClientProviders = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig value={{ fetcher }}>
      {children}
    </SWRConfig>
  );
};

export { ClientProviders };