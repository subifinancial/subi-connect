import { PayrollIntegrationList } from '../../components';
import { useCompany } from '../../hooks/use-company';
import { usePayrollSystems } from '../../hooks/use-payroll-systems';
import { cn } from '../../lib/utils';
import { Skeleton } from '../../ui/skeleton';
import PayrollIntegrationManagementPage from '../payroll-integration-management';
import React from 'react';

const PayrollIntegrationsPage: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { data: company } = useCompany();
  const { data: connectedPayrolls } = usePayrollSystems();

  const connectedPayroll = React.useMemo(() => {
    return connectedPayrolls?.results?.find((item) => item.isConnected);
  }, [connectedPayrolls]);

  // TODO: migrate to multi payroll management
  if (connectedPayrolls && connectedPayroll) {
    return (
      <PayrollIntegrationManagementPage accountPayroll={connectedPayroll} />
    );
  }

  return (
    <div
      className={cn(
        'subi-connect sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-flex-col sc-gap-1'>
        <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
          Integrations
        </span>
        {company ? (
          <span className='sc-text-xs sc-text-secondary/50'>
            Connect your payroll tool to your {company?.account.name} account.
          </span>
        ) : (
          <Skeleton className='sc-h-5 sc-w-64' />
        )}
      </div>
      <div className='sc-h-full sc-w-full'>
        <PayrollIntegrationList />
      </div>
    </div>
  );
};

export default PayrollIntegrationsPage;
