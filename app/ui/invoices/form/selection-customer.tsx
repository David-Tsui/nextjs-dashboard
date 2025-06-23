import { CustomerField } from '@/app/lib/definitions';
import { UserCircleIcon } from '@heroicons/react/24/outline';

type CustomerSelectionProps = {
  customers: CustomerField[];
  defaultValue?: string;
  errors?: string[];
} & React.HTMLProps<HTMLSelectElement>;

export default function CustomerSelection({
  customers,
  defaultValue = '', // if not '', customers[0] will be selected
  errors,
  ...restProps
}: CustomerSelectionProps) {
  return (
    <>
      <div className="relative">
        <select
          id="customer"
          name="customerId"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={defaultValue}
          aria-invalid={errors && errors.length > 0}
          {...restProps}
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
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {
          errors?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))
        }
      </div>
    </>
  );
}
