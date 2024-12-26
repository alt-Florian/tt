import { useApi } from "@hooks/api/useApi";
import {
  BankDetail,
  BankDetailResponse,
} from "@interfaces/config/BankDetails.interface";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";

const api = useApi();
const bank_detail_api_path = "/config-mission/bank-details";

class BankDetailApi {
  public async createBankDetail(
    bankDetail: BankDetail
  ): Promise<BankDetailResponse> {
    try {
      const { data } = await api.post(`${bank_detail_api_path}`, bankDetail);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllBankDetails(): Promise<ConfigResponse> {
    try {
      const { data } = await api.get(`/config-mission/bank-details?limit=0`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getBankDetailById(id: string): Promise<BankDetailResponse> {
    try {
      const { data } = await api.get(`${bank_detail_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateBankDetail(
    id: string,
    bankDetail: Partial<BankDetail>
  ): Promise<BankDetailResponse> {
    try {
      const { data } = await api.post(
        `${bank_detail_api_path}/${id}`,
        bankDetail
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteBankDetail(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${bank_detail_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const bankDetailApi = new BankDetailApi();
