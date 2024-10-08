import type { ConnectPayrollResponse } from '../services/api/payroll/types';
import { usePayrollSystemContext } from '@/components/payroll-integration/context';
import type { AccountPayrollSystemExtended } from '@/types';
import React from 'react';

type PayrollIntegrationContext = {
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  data: ConnectPayrollResponse | undefined;
  setData: React.Dispatch<
    React.SetStateAction<ConnectPayrollResponse | undefined>
  >;
  windowFailed: boolean;
  setWindowFailed: React.Dispatch<React.SetStateAction<boolean>>;
  onIntegrationSuccess: () => Promise<void>;
};

export const PayrollIntegrationContext = React.createContext<
  PayrollIntegrationContext | undefined
>(undefined);

export const usePayrollIntegrationContext = (): PayrollIntegrationContext => {
  const context = React.useContext(PayrollIntegrationContext);
  if (!context) {
    throw new Error(
      'usePayrollIntegrationContext must be used within a PayrollIntegrationProvider',
    );
  }
  return context;
};

type PayrollIntegrationProviderProps = {
  onIntegrationSuccess?: (
    payrollSystem: AccountPayrollSystemExtended,
  ) => Promise<void>;
  children: React.ReactNode;
};

export const PayrollIntegrationProvider = ({
  onIntegrationSuccess,
  children,
}: PayrollIntegrationProviderProps) => {
  const { payrollSystem } = usePayrollSystemContext();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ConnectPayrollResponse | undefined>();
  const [windowFailed, setWindowFailed] = React.useState<boolean>(false);

  const handleOnIntegrationSuccess = React.useCallback(async () => {
    await onIntegrationSuccess?.(payrollSystem);
  }, [onIntegrationSuccess, payrollSystem]);

  const value = React.useMemo(
    () =>
      ({
        onIntegrationSuccess: handleOnIntegrationSuccess,
        isPending,
        setIsPending,
        data,
        setData,
        windowFailed,
        setWindowFailed,
      }) satisfies PayrollIntegrationContext,
    [isPending, setIsPending, data, setData, windowFailed, setWindowFailed],
  );

  return (
    <PayrollIntegrationContext.Provider value={value}>
      {children}
    </PayrollIntegrationContext.Provider>
  );
};
