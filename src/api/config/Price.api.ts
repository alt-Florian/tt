import { useApi } from "@hooks/api/useApi";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import { Price, PriceResponse } from "@interfaces/config/Price.interface";

const api = useApi();
const price_api_path = "/config-mission/prices";

class PriceApi {
  public async createPrice(price: Price): Promise<PriceResponse> {
    try {
      const { data } = await api.post(`${price_api_path}`, price);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllPrices(): Promise<ConfigResponse> {
    try {
      const { data } = await api.post(`/search?limit=0`, {
        scope: 9,
        filterSet: [],
        query: [],
        conjonction: null,
        display: ["_id", "name"],
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getPriceById(id: string): Promise<PriceResponse> {
    try {
      const { data } = await api.get(`${price_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updatePrice(
    id: string,
    price: Partial<Price>
  ): Promise<PriceResponse> {
    try {
      const { data } = await api.post(`${price_api_path}/${id}`, price);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deletePrice(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${price_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const priceApi = new PriceApi();
