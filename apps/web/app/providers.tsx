'use client';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <GeistProvider>
      <CssBaseline />
      {children}
    </GeistProvider>
  );
};
