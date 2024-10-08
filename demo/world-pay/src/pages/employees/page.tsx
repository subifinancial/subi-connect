import EmployeesComponent from './component';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';

export default function EmployeesPage() {
  const { company } = useAuthenticationAuthenticatedContext();

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>
          WorldPay - {company.name}'s Employees
        </h1>
      </div>
      <EmployeesComponent />
    </main>
  );
}
