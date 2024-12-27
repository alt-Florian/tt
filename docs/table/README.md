# Table Dynamique - Documentation Technique

## Vue d'ensemble

Le système de table dynamique est un composant React hautement configurable qui fournit des fonctionnalités avancées comme :

- Gestion des colonnes (affichage/masquage, réorganisation)
- Filtrage avancé avec sauvegarde des filtres
- Recherche globale
- Pagination
- Formatage personnalisé des cellules
- Gestion de l'état via Zustand

## Architecture

```
src/components/ui/table/
├── EnhancedTable.tsx        # Composant principal
├── TableHeader.tsx          # En-tête avec recherche et contrôles
├── TableBody.tsx            # Corps de la table avec données
├── ColumnManager/          # Gestion des colonnes
│   ├── ColumnManager.tsx    # Interface de gestion des colonnes
│   ├── SortableColumn.tsx   # Colonne réorganisable
│   └── ProgressColumn.tsx   # Exemple de colonne spéciale
└── Filter/                 # Système de filtrage
    ├── FilterManager.tsx    # Gestionnaire de filtres
    ├── FilterBuilder.tsx    # Construction de filtres
    ├── FilterCondition.tsx  # Condition de filtre unique
    ├── SavedFilters.tsx     # Filtres sauvegardés
    └── types.ts            # Types TypeScript
```

## Utilisation

### 1. Configuration des colonnes

```typescript
const columns = [
  {
    id: 'name',
    label: 'Nom',
    visible: true
  },
  {
    id: 'status',
    label: 'Statut',
    visible: true
  }
];
```

### 2. Configuration des filtres

```typescript
const filters: FilterFieldConfig[] = [
  {
    id: 'name',
    label: 'Nom',
    type: 'text'
  },
  {
    id: 'status',
    label: 'Statut',
    type: 'select',
    options: [
      { value: 'active', label: 'Actif' },
      { value: 'inactive', label: 'Inactif' }
    ]
  }
];
```

### 3. Implémentation

```typescript
import { EnhancedTable } from '@components/ui/table/EnhancedTable';

function MyPage() {
  return (
    <EnhancedTable
      data={data}
      columns={columns}
      filters={filters}
      onSearch={handleSearch}
      onFilter={handleFilter}
      skip={skip}
      count={count}
      take={take}
      onPaginationChange={handlePaginationChange}
      transformer={tableHelper}
      path="/items"
    />
  );
}
```

## Personnalisation

### Transformer

Le système utilise un transformer pour formater les données. Créez une classe qui étend `TransformTable` :

```typescript
class CustomTransformer extends TransformTable {
  format<T>(id: string, value: T) {
    switch (id) {
      case 'date':
        return this.formatDate(value as Date);
      case 'status':
        return this.formatStatus(value as string);
      default:
        return value;
    }
  }
}
```

### Filtres personnalisés

Créez des composants de filtre personnalisés en implémentant l'interface `FilterFieldConfig` :

```typescript
const customFilter: FilterFieldConfig = {
  id: 'custom',
  label: 'Filtre personnalisé',
  type: 'select',
  options: {
    endpoint: 'api/options',
    transformResponse: (data) => ({
      value: data.id,
      label: data.name
    })
  }
};
```



## Exemples d'utilisation

### Exemple basique

```typescript
const columns = [
  { id: 'name', label: 'Nom', visible: true },
  { id: 'email', label: 'Email', visible: true }
];

const filters = [
  { id: 'name', label: 'Nom', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' }
];

<EnhancedTable
  data={users}
  columns={columns}
  filters={filters}
  onSearch={(query) => console.log('Searching:', query)}
  onFilter={(filters) => console.log('Filtering:', filters)}
  skip={0}
  count={100}
  take={10}
  onPaginationChange={(newSkip) => setSkip(newSkip)}
  transformer={tableHelper}
  path="/users"
/>
```

### Exemple avancé avec filtres personnalisés

```typescript
const advancedFilters: FilterFieldConfig[] = [
  {
    id: 'status',
    label: 'Statut',
    type: 'select',
    multiSelect: true,
    options: {
      endpoint: 'statuses',
      searchable: true,
      minChars: 2,
      transformResponse: (data) => data.map(item => ({
        value: item.id,
        label: item.name
      }))
    }
  }
];
```
