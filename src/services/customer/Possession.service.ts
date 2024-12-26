import { possessionApi } from "@api/customer/Possession.api";
import {
  Possession,
  PossessionsResponse,
} from "@interfaces/customer/Possessions.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class PossessionService {
  public getCustomerPossessions(
    customerId: string
  ): UseQueryResult<PossessionsResponse, any> {
    return useQuery<PossessionsResponse, any>({
      queryKey: [`possession${customerId}`],
      queryFn: () => possessionApi.getCustomerPossessions(customerId),
      staleTime: 0,
    });
  }

  public createPossession(): UseMutationResult<
    PossessionsResponse,
    any,
    { customerId: string; possession: Possession }
  > {
    return useMutation<
      PossessionsResponse,
      any,
      { customerId: string; possession: Possession }
    >({
      mutationFn: ({ customerId, possession }) =>
        possessionApi.createPossession(customerId, possession),
    });
  }

  public updatePossession(): UseMutationResult<
    PossessionsResponse,
    any,
    {
      customerId: string;
      possessionId: string;
      possession: Partial<Possession>;
    }
  > {
    return useMutation<
      PossessionsResponse,
      any,
      {
        customerId: string;
        possessionId: string;
        possession: Partial<Possession>;
      }
    >({
      mutationFn: ({ customerId, possessionId, possession }) =>
        possessionApi.updatePossession(customerId, possessionId, possession),
    });
  }

  public deletePossession(): UseMutationResult<
    PossessionsResponse,
    any,
    { customerId: string; possessionId: string }
  > {
    return useMutation<
      PossessionsResponse,
      any,
      { customerId: string; possessionId: string }
    >({
      mutationFn: ({ customerId, possessionId }) =>
        possessionApi.deletePossession(customerId, possessionId),
    });
  }
}
export const possessionService = new PossessionService();
