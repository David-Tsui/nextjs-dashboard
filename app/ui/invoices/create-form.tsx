'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import type { State } from '@/app/lib/actions';
import { createInvoice } from '@/app/lib/actions';
import SubmitButton from '../submit-button';
import { useActionState, useEffect, useState } from 'react';
import CustomerSelection from './form/selection-customer';
import AmountInput from './form/input-amount';
import StatusRadioButtons from './form/radio-button-status';
import ValidationModeSwitch from './form/switch-validation-mode';
import ControlPanel from './panel-control';

type CreateInvoiceFormProps = {
  customers: CustomerField[];
};

export default function CreateInvoiceForm({ customers }: CreateInvoiceFormProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, pending] = useActionState(createInvoice, initialState);
  const [validatedByServer, setValidatedByServer] = useState(false);
  const [localErrors, setLocalErrors] = useState<State['errors']>({});

  // 當 actionState 有錯誤時同步到本地 errors
  useEffect(() => {
    setLocalErrors(state.errors || {});
  }, [state.errors]);

  // 清除單一欄位錯誤
  const clearError = (field: keyof NonNullable<State['errors']>) => {
    setLocalErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!customers || customers.length === 0) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-700">
        No customers available. Please add a customer before creating an invoice.
      </div>
    );
  }

  return (
    <form action={formAction}>
      <ControlPanel
        title="Form Control Panel"
        description="Configure validation and other settings for this form"
        settings={[
          {
            label: 'Form Validation Mode',
            render: (
              <ValidationModeSwitch
                value={validatedByServer}
                onChange={setValidatedByServer}
              />
            ),
          },
        ]}
      />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <CustomerSelection
            customers={customers}
            required={!validatedByServer}
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
              required={!validatedByServer}
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
            required={!validatedByServer}
            defaultValue="pending"
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
        <SubmitButton pending={pending}>
          Create Invoice
        </SubmitButton>
      </div>
    </form>
  );
}
