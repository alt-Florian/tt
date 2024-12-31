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
                    // Vérifier d'abord les valeurs déjà résolues
                    const storedValues = resolvedValues['customer'] || [];


                    // Filtrer les IDs qui ne sont pas encore résolus
                    const missingIds = ids.filter(id =>
                        !storedValues.find(v => v.id === id)
                    );

                    if (missingIds.length === 0) {
                        // Si toutes les valeurs sont résolues, les retourner
                        return storedValues.filter(v => ids.includes(v.id));
                    }

                    // Sinon, faire l'appel API pour les valeurs manquantes
                    const responses = await Promise.all(
                        missingIds.map(id => customerApi.getPhysicalCustomerProfile(id))
                    );

                    const newResolvedValues = responses.map(response => ({
                        value: response.datas.details._id,
                        label: `${response.datas.details.row_infos.firstname} ${response.datas.details.name}`
                    }));

                    // Combiner les nouvelles valeurs avec celles déjà résolues
                    const allValues = [...storedValues, ...newResolvedValues];
                    console.log("🚀 ~ FilterValueResolver ~ resolve: ~ allValues:", allValues)

                    // Retourner uniquement les valeurs demandées
                    return allValues.filter(v => ids.includes(v.id));
                } catch (error) {
                    console.error('Error resolving customer values:', error);
                    return [];
                }
            }
        }
    ];

    public async resolveFilterValues(conditions: FilterCondition[], resolvedValues: Record<string, any[]>): Promise<FilterCondition[]> {
        const resolvedConditions = await Promise.all(
            conditions.map(async (condition) => {
                const resolver = this.resolvers.find(r => r.field === condition.field);

                if (!resolver) return condition;

                if (Array.isArray(condition.value)) {
                    const rValues = await resolver.resolve(condition.value as string[], resolvedValues);
                    return {
                        ...condition,
                        resolvedValues: rValues
                    };
                } else {
                    const rValues = await resolver.resolve([condition.value as string], resolvedValues);
                    return {
                        ...condition,
                        resolvedValues: rValues[0]
                    };
                }
            })
        );

        return resolvedConditions;
    }
}