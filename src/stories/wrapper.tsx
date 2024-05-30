import { SubiConnectProvider } from '../context/subi-connect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const queryClient = new QueryClient({});

const connectionFn = async () => {
  const result = await axios.post(
    'http://localhost:8082/subi-connect/authentication/company-access-token',
    { company: { referenceId: 'abc', name: 'sample company' } },
    {
      headers: {
        'x-api-key': process.env.VITE_DRAFT_API_KEY,
      },
    },
  );
  return result.data.accessToken;
};

export const withSubiConnectProvider = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  return (props: T) => (
    <QueryClientProvider client={queryClient}>
      <SubiConnectProvider connectionFn={connectionFn}>
        <Component {...props} />
      </SubiConnectProvider>
    </QueryClientProvider>
  );
};
