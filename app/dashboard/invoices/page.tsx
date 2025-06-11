import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import React from 'react';

export default async function Page() {
  return (
    <div>
      <p>Invoices Page</p>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestInvoices />
      </div>
    </div>
  );
};
