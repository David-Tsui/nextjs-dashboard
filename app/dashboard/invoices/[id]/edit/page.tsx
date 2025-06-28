import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const invoice = await fetchInvoiceById((await params).id);

  if (!invoice) {
    return {
      title: 'Invoice Not Found',
      description: 'The invoice you are trying to edit does not exist.',
    };
  }

  return {
    title: `Edit Invoice: #${invoice.id}`,
    description: `Edit invoice for ${invoice.customer_id} (ID: #${invoice.id})`,
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
