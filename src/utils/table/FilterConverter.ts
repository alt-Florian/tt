import { enumOperator, FilterCondition, FilterLogic, SavedFilterType } from '@components/ui/table/Filter/types';
import { FilterDefinition } from './interfaces';

export class FilterConverter {
    private convertOperator(operator: number): enumOperator {
        const operatorMap: { [key: number]: enumOperator } = {
            0: enumOperator.CONTAIN,
            1: enumOperator.DOES_NOT_CONTAIN,
            2: enumOperator.CAN_CONTAIN,
            3: enumOperator.CANNOT_CONTAIN,
            4: enumOperator.HAS_ANY,
            5: enumOperator.HAS_ALL_OF,
            6: enumOperator.HAS_NONE_OF,
            7: enumOperator.EQ,
            8: enumOperator.NE,
            9: enumOperator.GT,
            10: enumOperator.GTE,
            11: enumOperator.LT,
            12: enumOperator.LTE,
            13: enumOperator.BETWEEN
        };

        return operatorMap[operator] || enumOperator.EQ;
    }

    private convertConjonction(conjonction: number): FilterLogic {
        return conjonction === 0 ? 'and' : 'or';
    }

    private mergeArrayValues(values: any[]): any[] {
        const flattenedValues = values.reduce((acc: any[], val) => {
            const arrayVal = Array.isArray(val) ? val : [val];
            return [...acc, ...arrayVal];
        }, []);

        return [...new Set(flattenedValues)];
    }

    private mergeSameFieldConditions(conditions: FilterCondition[]): FilterCondition[] {
        const fieldGroups = new Map<string, FilterCondition[]>();

        conditions.forEach(condition => {
            const existing = fieldGroups.get(condition.field) || [];
            fieldGroups.set(condition.field, [...existing, condition]);
        });

        const mergedConditions: FilterCondition[] = [];

        fieldGroups.forEach((groupConditions, field) => {
            if (groupConditions.length === 1) {
                mergedConditions.push(groupConditions[0]);
            } else {
                const values = groupConditions.map(c => c.value);
                const mergedValue = this.mergeArrayValues(values);

                mergedConditions.push({
                    id: groupConditions[0].id,
                    field,
                    operator: enumOperator.BETWEEN,
                    value: mergedValue
                });
            }
        });

        return mergedConditions;
    }

    private convertFilterSet(filterSet: FilterDefinition['filterSet']): FilterCondition[] {
        const conditions = filterSet.map((filter, index) => ({
            id: index.toString(),
            field: filter.field,
            operator: this.convertOperator(filter.operator),
            value: filter.value
        }));

        return this.mergeSameFieldConditions(conditions);
    }

    public convert(filters: FilterDefinition[]): SavedFilterType[] {
        return filters.map(filter => ({
            id: filter._id,
            name: `Filtre ${filter._id.slice(-4)}`,
            conditions: this.convertFilterSet(filter.filterSet),
            logic: this.convertConjonction(filter.conjonction)
        }));
    }
}