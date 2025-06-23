'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import SubmitButton from '../submit-button';
import { CamelCasedPropertiesDeep } from 'type-fest';
import { useActionState, useEffect, useRef, useState } from 'react';
import { State, updateInvoice } from '@/app/lib/actions';
import CustomerSelection from './form/selection-customer';
import AmountInput from './form/input-amount';
import StatusRadioButtons from './form/radio-button-status';

type EditInvoiceFormProps = {
  invoice: InvoiceForm;
  customers: CustomerField[];
};

export default function EditInvoiceForm({
  invoice,
  customers,
}: EditInvoiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);
  const initialData: CamelCasedPropertiesDeep<Omit<InvoiceForm, 'id'>> = {
    customerId: invoice.customer_id,
    amount: invoice.amount,
    status: invoice.status,
  };

  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(
    updateInvoiceWithId,
    initialState
  );
  const [localErrors, setLocalErrors] = useState<State['errors']>({});

  // 同步 actionState 的 errors 到本地
  useEffect(() => {
    setLocalErrors(state.errors || {});
  }, [state.errors]);

  // 清除單一欄位錯誤
  const clearError = (field: keyof NonNullable<State['errors']>) => {
    setLocalErrors((prev) => ({ ...prev, [field]: undefined }));
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
      action={formAction}
      ref={formRef}
      onChange={handleFormChange}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <CustomerSelection
            customers={customers}
            defaultValue={invoice.customer_id}
            required
            errors={localErrors?.customerId}
            onChange={() => clearError('customerId')}
          />
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <AmountInput
              defaultValue={invoice.amount}
              required
              errors={localErrors?.amount}
              onChange={() => clearError('amount')}
            />
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <StatusRadioButtons
            defaultValue={invoice.status}
            required
            errors={localErrors?.status}
            onChange={() => clearError('status')}
          />
        </fieldset>
      </div>

      <div className="mt-4 form-error">
        {state.message && (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">
            {state.message}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <SubmitButton
          disabled={!dirty}
          pendingText="Saving..."
        >
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}
