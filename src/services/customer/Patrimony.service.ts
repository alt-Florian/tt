import { patrimonyApi } from "@api/customer/Patrimony.api";
import {
  Patrimony,
  PatrimonyResponse,
} from "@interfaces/customer/Patrimony.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class PatrimonyService {
  public getCustomerPatrimony(
    customerId: string
  ): UseQueryResult<PatrimonyResponse, any> {
    return useQuery<PatrimonyResponse, any>({
      queryKey: [`patrimony${customerId}`],
      queryFn: () => patrimonyApi.getCustomerPatrimony(customerId),
      staleTime: 0,
    });
  }

  public createPatrimony(): UseMutationResult<
    PatrimonyResponse,
    any,
    { customerId: string; patrimony: Patrimony }
  > {
    return useMutation<
      PatrimonyResponse,
      any,
      { customerId: string; patrimony: Patrimony }
    >({
      mutationFn: ({ customerId, patrimony }) =>
        patrimonyApi.createPatrimony(customerId, patrimony),
    });
  }

  public updatePatrimony(): UseMutationResult<
    PatrimonyResponse,
    any,
    {
      customerId: string;
      patrimonyId: string;
      patrimony: Partial<Patrimony>;
    }
  > {
    return useMutation<
      PatrimonyResponse,
      any,
      {
        customerId: string;
        patrimonyId: string;
        patrimony: Partial<Patrimony>;
      }
    >({
      mutationFn: ({ customerId, patrimonyId, patrimony }) =>
        patrimonyApi.updatePatrimony(customerId, patrimonyId, patrimony),
    });
  }

  public deletePatrimony(): UseMutationResult<
    PatrimonyResponse,
    any,
    { customerId: string; patrimonyId: string }
  > {
    return useMutation<
      PatrimonyResponse,
      any,
      { customerId: string; patrimonyId: string }
    >({
      mutationFn: ({ customerId, patrimonyId }) =>
        patrimonyApi.deletePatrimony(customerId, patrimonyId),
    });
  }
}
export const patrimonyService = new PatrimonyService();
