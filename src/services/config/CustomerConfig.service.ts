import { customerConfigApi } from "@api/config/CustomerConfig.api";
import {
  CustomerConfig,
  CustomerConfigResponse,
} from "@interfaces/config/CustomerConfig.interface";

import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class CustomerConfigService {
  public createCustomerConfig(): UseMutationResult<
    CustomerConfigResponse,
    any,
    CustomerConfig
  > {
    return useMutation<CustomerConfigResponse, any, CustomerConfig>({
      mutationFn: (customerConfig: CustomerConfig) =>
        customerConfigApi.createCustomerConfig(customerConfig),
    });
  }

  public getCustomerConfigById(
    id: string
  ): UseQueryResult<CustomerConfigResponse, any> {
    return useQuery<CustomerConfigResponse, any>({
      queryKey: [`customerConfig/${id}`],
      queryFn: () => customerConfigApi.getCustomerConfigById(id),
      staleTime: 0,
    });
  }

  public updateCustomerConfig(): UseMutationResult<
    CustomerConfigResponse,
    any,
    { id: string; newCustomerConfig: Partial<CustomerConfig> }
  > {
    return useMutation<
      CustomerConfigResponse,
      any,
      { id: string; newCustomerConfig: Partial<CustomerConfig> }
    >({
      mutationFn: ({ id, newCustomerConfig }) =>
        customerConfigApi.updateCustomerConfig(id, newCustomerConfig),
    });
  }

  public deleteCustomerConfig(): UseMutationResult<
    DeleteResponse,
    any,
    string
  > {
    return useMutation<DeleteResponse, any, string>({
      mutationFn: (id: string) => customerConfigApi.deleteCustomerConfig(id),
    });
  }
}

export const customerConfigService = new CustomerConfigService();
