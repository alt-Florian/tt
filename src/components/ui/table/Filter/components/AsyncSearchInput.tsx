import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import { filterService } from '@services/Filter.service';
import { AsyncSearchConfig } from '../types';

interface AsyncSearchInputProps {
  config: AsyncSearchConfig;
  value: string;
  onChange: (value: string) => void;
}

export function AsyncSearchInput({
  config,
  value,
  onChange,
}: AsyncSearchInputProps) {
  const [search, setSearch] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const { endpoint, minChars = 3, placeholder, transformResponse } = config;

  const { data, isLoading } = useQuery({
    queryKey: [`filterOptions-${endpoint}-${search}`],
    queryFn: () => filterService.getFilterOptions(endpoint, search),
    select: (data) => {
      if (!data?.datas) return [];
      return transformResponse ? transformResponse(data.datas) : [];
    },
    enabled: search.length >= minChars
  });

  const debouncedSearch = debounce((term: string) => {
    setSearch(term);
  }, 300);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onFocus={() => setShowResults(true)}
        className="rounded-md border-gray-300 text-sm min-w-[150px]"
        placeholder={placeholder}
      />

      {showResults && search.length >= minChars && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          {isLoading ? (
            <div className="p-2 text-sm text-gray-500">Chargement...</div>
          ) : data?.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {data.map((item) => (
                <li
                  key={item.value}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onChange(item.value);
                    setShowResults(false);
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-sm text-gray-500">Aucun résultat</div>
          )}
        </div>
      )}
    </div>
  );
}