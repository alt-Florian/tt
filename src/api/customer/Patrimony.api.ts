import { useApi } from "@hooks/api/useApi";
import {
  Patrimony,
  PatrimonyResponse,
} from "@interfaces/customer/Patrimony.interface";

const api = useApi();

class PatrimonyApi {
  public async getCustomerPatrimony(
    customerId: string
  ): Promise<PatrimonyResponse> {
    try {
      const { data } = await api.get(`/crm/customer/${customerId}/patrimony`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async createPatrimony(
    customerId: string,
    patrimony: Patrimony
  ): Promise<PatrimonyResponse> {
    try {
      const { data } = await api.post(
        `/crm/customer/${customerId}/patrimony`,
        patrimony
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updatePatrimony(
    customerId: string,
    patrimonyId: string,
    patrimony: Partial<Patrimony>
  ): Promise<PatrimonyResponse> {
    try {
      const { data } = await api.post(
        `/crm/customer/${customerId}/patrimony/${patrimonyId}`,
        patrimony
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deletePatrimony(
    customerId: string,
    patrimonyId: string
  ): Promise<PatrimonyResponse> {
    try {
      const { data } = await api.delete(
        `/crm/customer/${customerId}/patrimony/${patrimonyId}`
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export const patrimonyApi = new PatrimonyApi();
