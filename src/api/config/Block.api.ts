import { useApi } from "@hooks/api/useApi";
import {
  Block,
  BlockCreateResponse,
  BlockGetByIDResponse,
  BlockUpdateResponse,
} from "@interfaces/config/Block.interface";
import { DeleteResponse } from "@interfaces/config/DeleteResponse.interface";

const api = useApi();
const letter_template_api_path = "/config-mission/letter-blocks";

class BlockApi {
  public async createBlock(block: Block): Promise<BlockCreateResponse> {
    try {
      const { data } = await api.post(`${letter_template_api_path}`, block);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async getBlockById(id: string): Promise<BlockGetByIDResponse> {
    try {
      const { data } = await api.get(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async updateBlock(
    id: string,
    block: Partial<Block>
  ): Promise<BlockUpdateResponse> {
    try {
      const { data } = await api.post(
        `${letter_template_api_path}/${id}`,
        block
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteBlock(id: string): Promise<DeleteResponse> {
    try {
      const { data } = await api.delete(`${letter_template_api_path}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const blockApi = new BlockApi();
