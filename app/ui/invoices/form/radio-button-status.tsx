import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

type Status = 'pending' | 'paid';
type StatusRadioButtonsProps = {
  defaultValue?: Status;
  errors?: string[];
  onChange?: () => void;
} & React.HTMLProps<HTMLInputElement>;

export default function StatusRadioButtons({
  defaultValue,
  errors,  
  onChange,
  ...restProps
}: StatusRadioButtonsProps) {
  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              defaultChecked={defaultValue === 'pending'}
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              onChange={onChange}
              {...restProps}
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
              defaultChecked={defaultValue === 'paid'}
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              onChange={onChange}
              {...restProps}
            />
            <label
              htmlFor="paid"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
            >
              Paid <CheckIcon className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>

      <div
        id="status-error"
        aria-live="polite"
        aria-atomic="true"
      >
        {errors?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    </>
  );
}
