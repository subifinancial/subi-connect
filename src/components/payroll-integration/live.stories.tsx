import { SubiConnectProvider } from '../../context/subi-connect';
import PayrollIntegrationList from './payroll-integration-list';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const queryClient = new QueryClient({});

const connectionFn = async () => {
  const result = await axios.post(
    `${process.env.SUBI_CONNECT_PUBLIC_BASE_URL}authentication/company-access-token`,
    {
      company: {
        referenceId: 'world-pay-demo-referenceId-1',
        name: 'Demo Company',
      },
    },
    {
      headers: {
        'x-api-key': process.env.VITE_DRAFT_API_KEY,
      },
    },
  );
  return result.data.accessToken;
};

const Component = ({ error }: { error?: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubiConnectProvider
        connectionFn={connectionFn}
        companyContext='storybooks-demo-referenceId-1'
      >
        <PayrollIntegrationList error={error} />
      </SubiConnectProvider>
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Live PayrollIntegrationList',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    error: <div>Custom Error Node</div>,
  },
};
