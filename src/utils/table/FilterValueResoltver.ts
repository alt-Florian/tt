import { FilterCondition } from "@components/ui/table/Filter/types";
import { customerApi } from "@api/customer/Customer.api";

export interface ValueResolver {
    field: string;
    resolve: (ids: string[], resolvedValues: Record<string, any[]>) => Promise<{ id: string, label: string }[]>;
}

export class FilterValueResolver {
    private resolvers: ValueResolver[] = [
        {
            field: 'customer',
            resolve: async (ids: string[], resolvedValues: Record<string, any[]>) => {
                try {
                    const storedValues = resolvedValues['customer'] || [];

                    const missingIds = ids.filter(id =>
                        !storedValues.find(v => v.id === id)
                    );

                    if (missingIds.length === 0) {
                        return storedValues.filter(v => ids.includes(v.id));
                    }

                    const responses = await Promise.all(
                        missingIds.map(id => customerApi.getPhysicalCustomerProfile(id))
                    );

                    const newResolvedValues = responses.map(response => ({
                        id: response.datas.details._id, 
                        label: `${response.datas.details.row_infos.firstname} ${response.datas.details.name}`
                    }));

                    const allValues = [...storedValues, ...newResolvedValues];

                    return allValues.filter(v => ids.includes(v.id));
                } catch (error) {
                    console.error('Error resolving customer values:', error);
                    return [];
                }
            }
        }
    ];

    async resolveFilterValues(conditions: FilterCondition[], resolvedValues: Record<string, any[]>): Promise<FilterCondition[]> {
        const resolvedConditions = await Promise.all(
            conditions.map(async (condition) => {
                const resolver = this.resolvers.find(r => r.field === condition.field);

                if (!resolver) return condition;

                const rValues = await resolver.resolve(condition.value as string[], resolvedValues);
                    return {
                        ...condition,
                        resolvedValues: Array.isArray(condition.value) ? rValues: rValues[0]
                    };
               
            })
        );

        return resolvedConditions;
    }
}