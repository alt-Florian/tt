import {
  enumConjonction,
  enumOperator,
  enumScope,
  enumTypeQuery,
} from "@enums/Filter.enum";

type FilterSetType = string | number | string[] | number[] | Date | Boolean;

export interface Filter {
  _id: string;
  conjonction: enumConjonction;
  filterSet: [
    {
      field: string;
      operator: enumOperator;
      value: FilterSetType;
    }
  ];
  userId: number;
  query: [
    {
      type: enumTypeQuery;
      messagePattern?: string;
      criterias: { key: string; value: FilterSetType; finalField?: string }[];
      query?: [
        { $match: Record<string, any> },
        { $group: Record<string, any> },
        { $sort: Record<string, 1 | -1> },
        { $project: Record<string, any> },
        { $limit: number },
        { $skip: number },
        { $unwind: string },
        { [operator: string]: any } // opérateurs inconnus
      ];
    }
  ];
  scope: enumScope;
  display?: string[];
}
