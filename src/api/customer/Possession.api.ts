import { useApi } from "@hooks/api/useApi";
import {
  Possession,
  PossessionsResponse,
} from "@interfaces/customer/Possessions.interface";

const api = useApi();

class PossessionApi {
  public async getCustomerPossessions(
    customerId: string
  ): Promise<PossessionsResponse> {
    try {
      const { data } = await api.get(`/crm/customer/${customerId}/possessions`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createPossession(
    customerId: string,
    possession: Possession
  ): Promise<PossessionsResponse> {
    try {
      const { data } = await api.post(
        `/crm/customer/${customerId}/possessions`,
        possession
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updatePossession(
    customerId: string,
    possessionId: string,
    possession: Partial<Possession>
  ): Promise<PossessionsResponse> {
    try {
      const { data } = await api.post(
        `/crm/customer/${customerId}/possessions/${possessionId}`,
        possession
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deletePossession(
    customerId: string,
    possessionId: string
  ): Promise<PossessionsResponse> {
    try {
      const { data } = await api.delete(
        `/crm/customer/${customerId}/possessions/${possessionId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export const possessionApi = new PossessionApi();
