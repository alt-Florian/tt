# Documentation des Types de Filtrage

## Types d'Opérateurs

```typescript
type FilterOperator = 
  | 'equals'           // Égal à
  | 'not_equals'       // Différent de
  | 'contains'         // Contient
  | 'not_contains'     // Ne contient pas
  | 'starts_with'      // Commence par
  | 'ends_with'        // Termine par
  | 'before'           // Avant (pour les dates)
  | 'after'            // Après (pour les dates)
  | 'between'          // Entre (pour les dates et nombres)
  | 'greater_than'     // Plus grand que
  | 'less_than_equal'  // Plus petit ou égal à
  | 'greater_than_equal' // Plus grand ou égal à
  | 'less_than';       // Plus petit que
```

## Types de Logique

```typescript
type FilterLogic = 'and' | 'or';  // Opérateurs logiques pour combiner les conditions
```

## Types de Champs

```typescript
type FilterFieldType = 
  | 'text'     // Champ texte
  | 'select'   // Liste déroulante
  | 'boolean'  // Booléen (vrai/faux)
  | 'number'   // Nombre
  | 'date';    // Date
```

## Structure d'une Condition

```typescript
interface FilterCondition {
  id: string;                    // Identifiant unique de la condition
  field: string;                 // Champ sur lequel s'applique la condition
  operator: FilterOperator;      // Opérateur de comparaison
  value: string | number | Array<string | number> | boolean | Date | null;  // Valeur de comparaison
  endDate?: Date | null;         // Date de fin pour l'opérateur 'between'
  endValue?: string | number | Date | null;  // Valeur de fin pour les plages
}
```

## Filtre Sauvegardé

```typescript
interface SavedFilterType {
  id: string;                  // Identifiant unique du filtre
  name: string;                // Nom du filtre
  conditions: FilterCondition[]; // Liste des conditions
  logic: FilterLogic;          // Logique de combinaison des conditions
}
```

## État du Filtre

```typescript
interface FilterState {
  conditions: FilterCondition[]; // Conditions actives
  logic: FilterLogic;           // Logique de combinaison
}
```

## Options de Sélection

```typescript
interface SelectOption {
  value: string;  // Valeur de l'option
  label: string;  // Libellé affiché
}
```

## Configuration de Sélection Dynamique

```typescript
interface DynamicSelectConfig {
  endpoint: string;            // Point d'API pour charger les options
  valueKey?: string;          // Clé pour la valeur dans la réponse API
  labelKey?: string;          // Clé pour le libellé dans la réponse API
  transformResponse?: (data: any) => SelectOption[];  // Transformation des données
  multiSelect?: boolean;      // Sélection multiple possible
  searchable?: boolean;       // Recherche activée
  minChars?: number;         // Nombre minimum de caractères pour la recherche
}
```

## Configuration d'un Champ de Filtre

```typescript
interface FilterFieldConfig {
  id: string;                 // Identifiant unique du champ
  label: string;              // Libellé affiché
  type: FilterFieldType;      // Type de champ
  options?: SelectOption[] | DynamicSelectConfig;  // Options pour les champs select
  multiSelect?: boolean;      // Sélection multiple possible
  singleUse?: boolean;        // Le champ ne peut être utilisé qu'une fois
}
```

## Utilisation

Ces types sont utilisés pour construire un système de filtrage flexible et typé. Voici un exemple d'utilisation :

```typescript
const filterConfig: FilterFieldConfig = {
  id: 'status',
  label: 'Statut',
  type: 'select',
  options: [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' }
  ],
  singleUse: true
};

const condition: FilterCondition = {
  id: '1',
  field: 'status',
  operator: 'equals',
  value: 'active'
};
```