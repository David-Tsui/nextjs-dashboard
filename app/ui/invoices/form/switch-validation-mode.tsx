import clsx from "clsx";


interface ValidationModeSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export default function ValidationModeSwitch({
  value,
  onChange,
  className = '',
}: ValidationModeSwitchProps) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 ">Server (Route + Zod)</span>
      </label>
    </div>
  );
}
