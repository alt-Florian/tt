import React from 'react';
import { GroupedResults, CategoryType, SearchResult } from '../types';
import { CategoryResults } from './CategoryResults';

interface SearchResultsProps {
  isLoading: boolean;
  query: string;
  groupedResults: GroupedResults;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  isLoading, 
  query, 
  groupedResults 
}) => {
  if (isLoading) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Recherche en cours...
      </div>
    );
  }

  if (query.length > 0 && 
    !Object.values(groupedResults).some(results => results && results.length > 0)
  ) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Aucun résultat trouvé.
      </div>
    );
  }

  return (
    <>
      {(Object.entries(groupedResults) as [CategoryType, SearchResult[]][]).map(
        ([category, results]) => (
          <CategoryResults 
            key={category}
            category={category}
            results={results || []}
          />
        )
      )}
    </>
  );
};