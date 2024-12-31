import { patrimonyApi } from "@api/customer/Patrimony.api";
import {
  CustomersPatrimonyResponse,
  Patrimony,
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
  ): UseQueryResult<CustomersPatrimonyResponse, any> {
    return useQuery<CustomersPatrimonyResponse, any>({
      queryKey: [`patrimony${customerId}`],
      queryFn: () => patrimonyApi.getCustomerPatrimony(customerId),
      staleTime: 0,
    });
  }

  public createPatrimony(): UseMutationResult<
    CustomersPatrimonyResponse,
    any,
    { customerId: string; patrimony: Patrimony }
  > {
    return useMutation<
      CustomersPatrimonyResponse,
      any,
      { customerId: string; patrimony: Patrimony }
    >({
      mutationFn: ({ customerId, patrimony }) =>
        patrimonyApi.createPatrimony(customerId, patrimony),
    });
  }

  public updatePatrimony(): UseMutationResult<
    CustomersPatrimonyResponse,
    any,
    {
      customerId: string;
      patrimonyId: string;
      patrimony: Partial<Patrimony>;
    }
  > {
    return useMutation<
      CustomersPatrimonyResponse,
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
    CustomersPatrimonyResponse,
    any,
    { customerId: string; patrimonyId: string }
  > {
    return useMutation<
      CustomersPatrimonyResponse,
      any,
      { customerId: string; patrimonyId: string }
    >({
      mutationFn: ({ customerId, patrimonyId }) =>
        patrimonyApi.deletePatrimony(customerId, patrimonyId),
    });
  }
}
export const patrimonyService = new PatrimonyService();
