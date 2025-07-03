import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QUERY_PARAMS } from '../invoices/config';
import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Manage your customers and view their details.',
};

export default async function Page(props: {
  searchParams?: Promise<{
    [QUERY_PARAMS]?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.[QUERY_PARAMS] || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="flex min-h-screen flex-col p-6">
      <Suspense>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  )
}
