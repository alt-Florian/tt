import { useApi } from "@hooks/api/useApi";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  Nature,
  NatureWithFullTemplateResponse,
} from "@interfaces/config/Nature.interface";

const api = useApi();
const letter_template_api_path = "/config-mission/letter-natures";

class NatureApi {
  public async createNature(
    nature: Nature
  ): Promise<NatureWithFullTemplateResponse> {
    try {
      const { data } = await api.post(`${letter_template_api_path}`, nature);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllNatures(): Promise<ConfigResponse> {
    try {
      const { data } = await api.post(`/search?limit=0`, {
        scope: 8,
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

  public async getNatureById(
    id: string
  ): Promise<NatureWithFullTemplateResponse> {
    try {
      const { data } = await api.get(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateNature(
    id: string,
    nature: Partial<Nature>
  ): Promise<NatureWithFullTemplateResponse> {
    try {
      const { data } = await api.post(
        `${letter_template_api_path}/${id}`,
        nature
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteNature(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const natureApi = new NatureApi();
