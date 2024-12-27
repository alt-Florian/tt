import { enumOperator } from './types';


export const FILTER_OPERATORS: Record<string, { label: string; value: enumOperator }[]> = {
    text: [
        { label: 'Est', value: enumOperator.EQ },
        { label: "N'est pas", value: enumOperator.NE },
        { label: 'Contient', value: enumOperator.CONTAIN },
        { label: 'Ne contient pas', value: enumOperator.CANNOT_CONTAIN }
    ],
    select: [
        { label: 'Est', value: enumOperator.EQ },
        { label: "N'est pas", value: enumOperator.NE }
    ],
    boolean: [
        { label: 'Est', value: enumOperator.EQ },
        { label: "N'est pas", value: enumOperator.NE }
    ],
    date: [
        { label: 'Est le', value: enumOperator.EQ },
        { label: "N'est pas le", value: enumOperator.NE },
        { label: 'Avant le', value: enumOperator.GT },
        { label: 'Après le', value: enumOperator.LT },
        { label: 'Entre', value: enumOperator.BETWEEN }
    ],
    number: [
        { label: 'Est égal à', value: enumOperator.EQ },
        { label: "N'est pas égal à", value: enumOperator.NE },
        { label: 'Est supérieur à', value: enumOperator.GT },
        { label: 'Est supérieur ou égal à', value: enumOperator.GTE },
        { label: 'Est inférieur à', value: enumOperator.LT },
        { label: 'Est inférieur ou égal à', value: enumOperator.LTE },
        { label: 'Est entre', value: enumOperator.BETWEEN }
    ]
};