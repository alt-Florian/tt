import { configListApi } from "@api/config/ConfigList.api";
import { FilteredConfigResponse } from "@interfaces/config/ConfigList.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

class ConfigListService {
  public getDatasForConfigPage(
    scope: number,
    skip: number,
    display: string[]
  ): UseQueryResult<FilteredConfigResponse, any> {
    return useQuery<FilteredConfigResponse, any>({
      queryKey: [
        `config-${scope}-${skip}-${display.join("-")}`,
        scope,
        skip,
        display,
      ],
      queryFn: () => configListApi.fetchAndFilterDatas(scope, skip, display),
      staleTime: 0,
    });
  }
}

export const configListService = new ConfigListService();
