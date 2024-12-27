import { useQuery } from '@tanstack/react-query';
import { filterService } from '@services/Filter.service';
import { DynamicSelectConfig } from '../types';
import { SmallSpinner } from '@components/ui/Spinner';
import MultiSelectV2 from '@components/ui/MultiSelectV2';
import Select from '@components/ui/Select';

interface DynamicSelectProps {
  config: DynamicSelectConfig;
  value: string;
  onChange: (value: string) => void;
  multiSelect?: boolean;
}

export function DynamicSelect({ config, value, onChange,  multiSelect = false }: DynamicSelectProps) {
  const { endpoint, transformResponse } = config;

  const { data, isLoading, error } = useQuery({
    queryKey: [`filterOptions-${endpoint}`],
    queryFn: () => filterService.getFilterOptions(endpoint),
    select: (data) => {
      if (!data?.datas) return [];
      return transformResponse ? transformResponse(data.datas) : [];
    }
  });

  if (isLoading) return <SmallSpinner />;
  if (error) return <div>Error loading options</div>;

  if (multiSelect) {
    return (
      <MultiSelectV2
        list={(data || []).map(opt => ({ id: opt.value, name: opt.label }))}
        values={Array.isArray(value) ? value : []}
        onChange={onChange}
            className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
            label=''
      />
    );
  }

  return (
    <Select
      list={(data || []).map(opt => ({ id: opt.value, name: opt.label }))}
      value={Array.isArray(value) ? value[0] : value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
    />
  );
}
