import { useApi } from "@hooks/api/useApi";
import { ConfigResponse } from "@interfaces/config/ConfigList.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";
import {
  LetterTemplate,
  LetterTemplateResponse,
  LetterTemplateWithFullBankDetailsResponse,
} from "@interfaces/config/LetterTemplate.interface";

const api = useApi();
const letter_template_api_path = "/config-mission/letter-templates";

class LetterTemplateApi {
  public async createLetterTemplate(
    letterTemplate: LetterTemplate
  ): Promise<LetterTemplateResponse> {
    try {
      const { data } = await api.post(
        `${letter_template_api_path}`,
        letterTemplate
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllLetterTemplates(): Promise<ConfigResponse> {
    try {
      const { data } = await api.post(`/search?limit=0`, {
        scope: 6,
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

  public async getLetterTemplateById(
    id: string
  ): Promise<LetterTemplateWithFullBankDetailsResponse> {
    try {
      const { data } = await api.get(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateLetterTemplate(
    id: string,
    letterTemplate: Partial<LetterTemplate>
  ): Promise<LetterTemplateResponse> {
    try {
      const { data } = await api.post(
        `${letter_template_api_path}/${id}`,
        letterTemplate
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteLetterTemplate(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const letterTemplateApi = new LetterTemplateApi();
