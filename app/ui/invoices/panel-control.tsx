import { ReactNode } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

type SettingItem = {
  label: ReactNode;
  render: ReactNode;
};

type PanelControlProps = {
  title?: string;
  description?: string;
  settings: SettingItem[];
};

export default function ControlPanel({
  title = 'Form Control Panel',
  description,
  settings,
}: PanelControlProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/80 px-6 py-4 mb-6 shadow-sm">
      <div className="flex items-center text-base font-semibold text-gray-800 mb-2">
        {title}
        <Cog6ToothIcon className="w-5 h-5 ml-2" />
      </div>
      {description && (
        <div className="mb-3 text-xs text-gray-500">{description}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((item, idx) => (
          <div key={idx} className="flex items-center [&>label]:w-44">
            <label className="inline-block mr-3 text-sm text-gray-600">
              {item.label}
            </label>
            {item.render}
          </div>
        ))}
      </div>
    </div>
  );
}
