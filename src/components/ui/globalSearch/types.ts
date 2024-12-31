import { UserIcon, ClipboardDocumentListIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export interface SearchResult {
    id: string;
    title: string;
    subtitle?: string;
    category: CategoryType;
    url: string;
}

export type CategoryType = 'missions' | 'customers' | 'contacts' | 'tasks';

export type IconMap = {
    [K in CategoryType]: typeof UserIcon;
};

export const CATEGORY_ICONS: IconMap = {
    missions: DocumentTextIcon,
    customers: UserIcon,
    contacts: UserIcon,
    tasks: ClipboardDocumentListIcon,
};

export type LabelMap = {
    [K in CategoryType]: string;
};

export const CATEGORY_LABELS: LabelMap = {
    missions: 'Missions',
    customers: 'Clients',
    contacts: 'Contacts',
    tasks: 'Tâches'
};

export interface SearchHistoryEntry {
    id: string;
    query: string;
    timestamp: number;
    category?: CategoryType;
    resultSelected?: string;
}

export type SelectableItem = SearchResult | SearchHistoryEntry;
export type ComboboxValue = SelectableItem | null;

export type GroupedResults = {
    missions?: SearchResult[];
    customers?: SearchResult[];
    contacts?: SearchResult[];
    tasks?: SearchResult[];
}
