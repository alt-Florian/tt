// src/components/ui/table/Filter/components/DynamicSelect.tsx
import { useFilterOptions } from '@services/Filter.service';
import { DynamicSelectConfig } from '../types';
import { SmallSpinner } from '@components/ui/Spinner';

interface DynamicSelectProps {
  config: DynamicSelectConfig;
  value: string;
  onChange: (value: string) => void;
}

export function DynamicSelect({ config, value, onChange }: DynamicSelectProps) {
  const { options, isLoading, error } = useFilterOptions(config);

  if (isLoading) return <SmallSpinner />;
  if (error) return <div>Error loading options</div>;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 text-sm flex-1 min-w-[120px]"
    >
      {options.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
