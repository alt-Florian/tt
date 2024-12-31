import React, { Fragment, useState, useRef, useEffect } from 'react';
import { 
  Combobox, 
  ComboboxInput,
  ComboboxOptions,
  Transition 
} from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { searchService } from '@services/Search.service';
import { useSearchShortcut } from '@services/Search.service';
import { useSearchHistoryStore } from '@stores/SearchHistory.store';
import { SearchResults } from './components/SearchResults';
import { SearchHistoryList } from './components/SearchHistoryList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SearchResult, ComboboxValue, GroupedResults, SearchHistoryEntry } from './types';
import { classNames } from '@utils/classNames';

export default function SearchAutocomplete() {
  const [selectedOption, setSelectedOption] = useState<SearchResult | null>(null);
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const searchHistory = useSearchHistoryStore(state => state.history);
  const addToHistory = useSearchHistoryStore(state => state.addToHistory);
  const navigate = useNavigate();
  const { data, isLoading } = searchService.search(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useSearchShortcut(inputRef);

  const groupedResults: GroupedResults = data?.results || {
    missions: [],
    customers: [],
    contacts: [],
    tasks: []
  };

  const hasResults = Object.values(groupedResults).some(
    results => results && results.length > 0
    );
    
     const handleSelect = (selected: ComboboxValue) => {
        if (!selected) return;
    
        if ('url' in selected) {
          // C'est un SearchResult
          setSelectedOption(selected);
          setQuery('');
          setIsFocused(false);
          // Ajouter à l'historique avant la navigation
          addToHistory(query, selected);
          navigate(selected.url);
        } else {
          // C'est un SearchHistoryEntry
          setQuery(selected.query);
          setIsHistoryMode(false);
        }
      };
    
      const filteredHistory = searchHistory
        .filter(entry => 
          !query.startsWith('/') || 
          entry.query.toLowerCase().includes(query.slice(1).toLowerCase())
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    
      const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        setIsHistoryMode(newQuery.startsWith('/'));
      };
    
      useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            setIsFocused(false);
            setIsHistoryMode(false);
            inputRef.current?.blur();
          }
        };
    
        const handleClickOutside = (event: MouseEvent) => {
          if (
            containerRef.current && 
            !containerRef.current.contains(event.target as Node)
          ) {
            setIsFocused(false);
            setIsHistoryMode(false);
          }
        };
    
        if (isFocused) {
          window.addEventListener('keydown', handleEscape);
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          window.removeEventListener('keydown', handleEscape);
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isFocused]);
    
      return (
        <>
          {/* Overlay avec opacité */}
          <Transition
            show={isFocused}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 " />
          </Transition>
    
          {/* Conteneur principal */}
          <div 
            ref={containerRef}
            className={classNames(
              'transition-all duration-200 ease-in-out pt-3',
              isFocused 
                ? 'fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4' 
                : 'relative flex-1'
            )}
          >
             <Combobox<ComboboxValue>
              value={selectedOption}
              onChange={handleSelect}
            >
              <div className="relative">
                <MagnifyingGlassIcon 
                  className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400" 
                  aria-hidden="true" 
                />
                <ComboboxInput<SearchResult | SearchHistoryEntry>
                  ref={inputRef}
                  onFocus={() => setIsFocused(true)}
                  className={classNames(
                    'w-full  bg-white pl-8 pr-4 text-gray-900 placeholder:text-gray-500 sm:text-sm',
                    isFocused 
                      ? 'h-10 rounded-lg shadow-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' 
                      : 'h-10 rounded-lg border-none',
                    isLoading ? 'pr-10' : ''
                  )}
                  placeholder="Rechercher... (Ctrl+Espace) ou / pour l'historique"
                  onChange={handleQueryChange}
                  displayValue={(item) => {
                    if (!item) return '';
                    if ('url' in item) return item.title;
                    return item.query;
                  }}
                />
                {isLoading && !isHistoryMode && <LoadingSpinner />}
              </div>
    
              <Transition
                show={isFocused && (
                  (isHistoryMode && query.length > 0) || 
                  (!isHistoryMode && query.length >= 2 && hasResults)
                )}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <ComboboxOptions className="absolute w-full overflow-auto overflow-x-hidden rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 mt-2">
                  {isHistoryMode ? (
                    <SearchHistoryList 
                      filteredHistory={filteredHistory}
                      onSelect={handleSelect}
                    />
                  ) : (
                    <SearchResults 
                      isLoading={isLoading}
                      query={query}
                      groupedResults={groupedResults}
                    />
                  )}
                </ComboboxOptions>
              </Transition>
            </Combobox>
          </div>
        </>
      );
    }
    
    