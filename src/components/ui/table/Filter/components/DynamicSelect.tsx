import { useQuery } from '@tanstack/react-query';
import { filterService } from '@services/Filter.service';
import { DynamicSelectConfig, SelectOption } from '../types';
import { SmallSpinner } from '@components/ui/Spinner';
import MultiSelectV2 from '@components/ui/MultiSelectV2';
import Select from '@components/ui/Select';
import { useState, useMemo, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

interface DynamicSelectProps {
  config: DynamicSelectConfig;
  value: string;
  onChange: (value: string | Array<string | number>) => void;
  multiSelect?: boolean;
}

export function DynamicSelect({ config, value, onChange, multiSelect = false }: DynamicSelectProps) {
  const { endpoint, transformResponse, searchable, minChars = 3 } = config;
  const [search, setSearch] = useState('');
  const [allOptions, setAllOptions] = useState<SelectOption[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: [`filterOptions-${endpoint}${searchable ? `-${search}` : ''}`],
    queryFn: () => filterService.getFilterOptions(endpoint, search),
    select: useCallback((data: any) => {
      if (!data?.datas) return [];
      return transformResponse ? transformResponse(data.datas) : [];
    }, [transformResponse]),
    enabled: !searchable || search.length >= minChars,
    staleTime: 30000,
    refetchOnWindowFocus: false
  });

  // Update allOptions when data changes
  useEffect(() => {
    if (data) {
      setAllOptions(prevOptions => {
        const newOptions = [...prevOptions];
        data.forEach(option => {
          if (!newOptions.find(existing => existing.value === option.value)) {
            newOptions.push(option);
          }
        });
        return newOptions;
      });
    }
  }, [data]);

  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setSearch(term);
    }, 300),
    []
  );

  const displayOptions = useMemo(() => {
    const currentOptions = data || [];
    const selectedValues = Array.isArray(value) ? value : [value];
    
    const selectedOptions = allOptions.filter(opt => 
      selectedValues.includes(opt.value) && 
      !currentOptions.find(current => current.value === opt.value)
    );

    return [...selectedOptions, ...currentOptions];
  }, [data, value, allOptions]);

  if (isLoading) {
    return <SmallSpinner />;
  }

  if (multiSelect) {
    return (
      <MultiSelectV2
        list={displayOptions.map(opt => ({ id: opt.value, name: opt.label }))}
        values={Array.isArray(value) ? value : []}
        onChange={onChange}
        className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
        label=""
        onSearch={searchable ? debouncedSearch : undefined}
        searchPlaceholder={searchable ? "Rechercher..." : undefined}
      />
    );
  }

  return (
    <Select
      list={displayOptions.map(opt => ({ id: opt.value, name: opt.label }))}
      value={Array.isArray(value) ? value[0] : value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300 text-sm min-w-[150px] flex-1"
      onSearch={searchable ? debouncedSearch : undefined}
      searchPlaceholder={searchable ? "Rechercher..." : undefined}
    />
  );
}