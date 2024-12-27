
// Interface pour un critère de filtre
export interface FilterCriteria {
    key: string;
    value: string | number | (string | number)[];
    finalField?: string;
}

// Interface pour une requête de base
export interface BaseQuery {
    type: number;
    messagePattern?: string;
    criterias: FilterCriteria[];
}

// Interface pour une condition de filtre
export interface FilterSetItem {
    field: string;
    operator: number;
    value: string | number | (string | number)[];
}

export interface MongoQuery extends BaseQuery {
    query?: Array<{
        $match?: Record<string, any>;
        $group?: Record<string, any>;
        $sort?: Record<string, 1 | -1>;
        $project?: Record<string, any>;
        $limit?: number;
        $skip?: number;
        $unwind?: string;
        $lookup?: {
            from: string;
            localField: string;
            foreignField: string;
            as: string;
        };
        [key: string]: any;
    }>;
}

// Interface principale pour le filtre
export interface FilterDefinition {
    _id: string;
    conjonction: number;
    filterSet: FilterSetItem[];
    userId: number;
    query: (BaseQuery | MongoQuery)[];
    scope: number;
    display?: string[];
    createdAt: string;
    updatedAt: string;
}