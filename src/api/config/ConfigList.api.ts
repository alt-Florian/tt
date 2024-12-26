import { useApi } from "@hooks/api/useApi";
import {
  ConfigResponse,
  FilteredConfigResponse,
} from "@interfaces/config/ConfigList.interface";

const api = useApi();

class ConfigListApi {
  public async fetchAndFilterDatas(
    scope: number,
    skip: number,
    display: string[]
  ): Promise<FilteredConfigResponse> {
    try {
      const { data }: { data: ConfigResponse } = await api.post(
        `/search?skip=${skip}`,
        {
          scope,
          filterSet: [],
          query: [],
          conjonction: null,
          display: display,
        }
      );
      return {
        paginate: data.paginate,
        statusCode: data.statusCode,
        filteredDatas: data.datas,
      };
    } catch (error: any) {
      throw error;
    }
  }
}
export const configListApi = new ConfigListApi();
