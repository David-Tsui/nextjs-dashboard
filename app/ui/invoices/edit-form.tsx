'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import SubmitButton from '../submit-button';
import { CamelCasedPropertiesDeep } from 'type-fest';
import { useRef, useState } from 'react';
import { updateInvoice } from '@/app/lib/actions';

function CustomerSelection({
  customers,
  defaultValue,
}: {
  customers: CustomerField[];
  defaultValue?: string;
}) {
  return (
    <>
      <select
        id="customer"
        name="customerId"
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={defaultValue}
        required
      >
        <option value="" disabled>
          Select a customer
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name} ({customer.email})
          </option>
        ))}
      </select>
      <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
    </>
  );
}

function AmountInput({ defaultValue }: { defaultValue?: number }) {
  return (
    <>
      <input
        id="amount"
        name="amount"
        type="number"
        step="0.01"
        defaultValue={defaultValue}
        placeholder="Enter USD amount"
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        required
      />
      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </>
  );
}

function StatusRadioButtons({ defaultStatus }: { defaultStatus: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <input
          id="pending"
          name="status"
          type="radio"
          value="pending"
          defaultChecked={defaultStatus === 'pending'}
          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
          required
        />
        <label
          htmlFor="pending"
          className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
        >
          Pending <ClockIcon className="h-4 w-4" />
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="paid"
          name="status"
          type="radio"
          value="paid"
          defaultChecked={defaultStatus === 'paid'}
          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
        />
        <label
          htmlFor="paid"
          className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
        >
          Paid <CheckIcon className="h-4 w-4" />
        </label>
      </div>
    </div>
  );
}

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);
  const initialData: CamelCasedPropertiesDeep<Omit<InvoiceForm, 'id'>> = {
    customerId: invoice.customer_id,
    amount: invoice.amount,
    status: invoice.status,
  };

  const handleFormChange = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const current = {
      customerId: formData.get('customerId'),
      amount: parseFloat(formData.get('amount') as string) || 0,
      status: formData.get('status'),
    };
    setDirty(JSON.stringify(current) !== JSON.stringify(initialData));
  }

  return (
    <form
      ref={formRef}
      onChange={handleFormChange}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <CustomerSelection
              customers={customers}
              defaultValue={invoice.customer_id}
            />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <AmountInput defaultValue={invoice.amount} />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <StatusRadioButtons defaultStatus={invoice.status} />
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton
          formAction={updateInvoice.bind(null, invoice.id)}
          disabled={!dirty}
          pendingText="Saving..."
        >
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}
