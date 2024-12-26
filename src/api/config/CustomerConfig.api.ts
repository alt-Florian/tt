import { useApi } from "@hooks/api/useApi";
import {
  CustomerConfig,
  CustomerConfigResponse,
} from "@interfaces/config/CustomerConfig.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";

const api = useApi();
const customerConfigPath = "/config-mission/customer";

class CustomerConfigApi {
  public async createCustomerConfig(
    customerConfig: CustomerConfig
  ): Promise<CustomerConfigResponse> {
    try {
      const { data } = await api.post(`${customerConfigPath}`, customerConfig);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getCustomerConfigById(
    id: string
  ): Promise<CustomerConfigResponse> {
    try {
      const { data } = await api.get(`${customerConfigPath}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateCustomerConfig(
    id: string,
    customerConfig: Partial<CustomerConfig>
  ): Promise<CustomerConfigResponse> {
    try {
      const { data } = await api.post(
        `${customerConfigPath}/${id}`,
        customerConfig
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteCustomerConfig(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${customerConfigPath}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const customerConfigApi = new CustomerConfigApi();
