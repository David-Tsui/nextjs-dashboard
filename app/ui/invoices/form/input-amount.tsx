import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

type AmountInputProps = {
  defaultValue?: number;
  errors?: string[];
  onChange?: () => void;
} & React.HTMLProps<HTMLInputElement>;

export default function AmountInput({
  defaultValue,
  errors,
  onChange,
  ...restProps
}: AmountInputProps) {
  return (
    <>
      <div className="relative">
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          defaultValue={defaultValue}
          placeholder="Enter USD amount"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          onChange={onChange}
          aria-invalid={errors && errors.length > 0}
          {...restProps}
        />
        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div
        id="amount-error"
        aria-live="polite"
        aria-atomic="true"
      >
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
